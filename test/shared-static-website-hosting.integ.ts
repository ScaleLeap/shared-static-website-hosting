import { IntegTest, IntegTestCaseStack } from '@aws-cdk/integ-tests-alpha';
import { App, CfnOutput } from 'aws-cdk-lib';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { SharedStaticWebsiteHosting } from '../src';
import { AWS_ACCOUNT_ID, ROOT_ZONE_NAME } from './env';

const app = new App({
  analyticsReporting: false,
  autoSynth: true,
  treeMetadata: false,
});

const testStack = new IntegTestCaseStack(app, 'ITS', {
  // needed for HostedZone.fromLookup
  env: {
    account: AWS_ACCOUNT_ID,
    region: 'us-east-1',
  },
});

const rootZone = HostedZone.fromLookup(testStack, 'RootZone', {
  domainName: ROOT_ZONE_NAME,
});

const swp = new SharedStaticWebsiteHosting(testStack, 'SharedStaticWebsiteHosting', {
  hostedZone: rootZone,
});

const testSubDomain = ['test', Date.now()].join('-');

new BucketDeployment(testStack, 'BucketDeployment', {
  destinationBucket: swp.bucket,
  distribution: swp.distribution,

  // Adds test data
  prune: false,
  sources: [
    Source.data(`${testSubDomain}/index.html`, 'index'),
    Source.data(`${testSubDomain}/test.html`, 'test'),
  ],
});

new CfnOutput(swp, 'BucketName', { value: swp.bucket.bucketName });
new CfnOutput(swp, 'DistributionDomainName', { value: swp.distribution.distributionDomainName });
new CfnOutput(swp, 'TestCloudFrontURL', { value: `https://${swp.distribution.distributionDomainName}/${testSubDomain}/` });
new CfnOutput(swp, 'TestURL', { value: `https://${testSubDomain}.${rootZone.zoneName}/` });

new IntegTest(app, 'IT1', {
  testCases: [
    testStack,
  ],
});
