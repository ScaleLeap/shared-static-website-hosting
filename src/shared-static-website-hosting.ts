import { RemovalPolicy } from 'aws-cdk-lib';
import { CertificateValidation, DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Distribution, OriginAccessIdentity, IDistribution, LambdaEdgeEventType } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { ARecord, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { BlockPublicAccess, Bucket, BucketAccessControl, BucketEncryption, IBucket, ObjectOwnership } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

const WILDCARD_RECORD_NAME = '*';

interface SharedStaticWebsiteHostingProps {
  /**
   * A hosted zone that is open for modification by the construct. This construct will add a wildcard
   * A record that points to the CloudFront distribution.
   */
  hostedZone: IHostedZone;

  /**
   * An S3 bucket where the static files will be stored.
   *
   * This construct assumes full control of the bucket.
   *
   * @default
   *
   * A new bucket will be created, if not provided.
   */
  bucket?: IBucket;
}

/**
 * Host static websites on a shared CloudFront distribution.
 */
export class SharedStaticWebsiteHosting extends Construct {
  /**
   * Bucket where the static files are stored.
   */
  readonly bucket: IBucket;

  /**
   * CloudFront distribution.
   */
  readonly distribution: IDistribution;

  readonly #hostedZone: IHostedZone;

  constructor(scope: Construct, id: string, props: SharedStaticWebsiteHostingProps) {
    super(scope, id);

    this.#hostedZone = props.hostedZone;
    const domainName = [WILDCARD_RECORD_NAME, this.#hostedZone.zoneName].join('.');

    this.bucket = props.bucket ?? new Bucket(this, 'Bucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,

      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      accessControl: BucketAccessControl.PRIVATE,
      objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
      encryption: BucketEncryption.S3_MANAGED,
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity', {
      comment: `CloudFront OriginAccessIdentity for ${this.bucket.bucketName}`,
    });

    // https://github.com/aws/aws-cdk/issues/13983
    this.bucket.grantRead(originAccessIdentity);

    const certificate = new DnsValidatedCertificate(this, 'Certificate', {
      hostedZone: this.#hostedZone,
      domainName,
      validation: CertificateValidation.fromDns(),
      cleanupRoute53Records: true,

      // CloudFront distributions requires the region to be us-east-1.
      region: 'us-east-1',
    });

    const originRequestHandler = new NodejsFunction(this, 'OriginRequestHandler', {
      entry: require.resolve('./request-handler'),
      runtime: Runtime.NODEJS_16_X,
    });

    this.distribution = new Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new S3Origin(this.bucket, { originAccessIdentity }),
        edgeLambdas: [
          {
            eventType: LambdaEdgeEventType.VIEWER_REQUEST,
            functionVersion: originRequestHandler.currentVersion,
          },
        ],
      },
      domainNames: [domainName],
      certificate,
      defaultRootObject: 'index.html',
    });

    new ARecord(this, 'AWildcardRecord', {
      zone: this.#hostedZone,
      recordName: WILDCARD_RECORD_NAME,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
      comment: `A sub-domain for the ${SharedStaticWebsiteHosting.name} construct.`,
    });
  }
}
