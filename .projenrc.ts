import { awscdk, javascript } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Roman Filippov',
  authorAddress: 'rf@romanfilippov.com',
  cdkVersion: '2.41.0',
  constructsVersion: '10.1.102',
  defaultReleaseBranch: 'main',
  name: 'cdk-static-website-preview',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/moltar/cdk-static-website-preview.git',
  deps: [
    'param-case',
  ],
  devDeps: [
    'aws-cdk',
    '@aws-cdk/integ-tests-alpha',
  ],
  integrationTestAutoDiscover: true,
});

project.synth();