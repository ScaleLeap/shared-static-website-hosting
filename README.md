# Shared Static Website Hosting via AWS CDK

> Creates a shared static website hosting on CloudFront.

## Install

```sh
npm i @scaleleap/cdk-shared-static-website-hosting
```

## Usage

```ts
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { SharedStaticWebsiteHosting } from '@scaleleap/cdk-shared-static-website-hosting';

const rootZone = HostedZone.fromLookup(scope, 'RootZone', {
  domainName: 'static.example.com',
});

const swp = new SharedStaticWebsiteHosting(scope, 'SharedStaticWebsiteHosting', {
  hostedZone: rootZone,
});
```

## Explanation

The following will be created for you:

- An S3 bucket to store static website files
- A CloudFront distribution to serve the website
- A wilcard `A` DNS record to map sub-domain to the S3 prefix
- An SSL/TLS certificate for the wildcard sub-domain

And the sub-domain will map to the S3 key prefix.

For example:

If you place your static website into:

```plain
s3://my-bucket/foo1/index.html
s3://my-bucket/foo1/image.png
```

The website will be served at:

```plain
https://foo1.static.example.com/
```
