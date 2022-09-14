import { awscdk, javascript } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Roman Filippov',
  authorAddress: 'rf@romanfilippov.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-static-website-preview',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/moltar/cdk-static-website-preview.git',
});

project.synth();