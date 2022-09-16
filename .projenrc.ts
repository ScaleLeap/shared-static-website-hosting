import { CdkConfig } from 'projen/lib/awscdk';

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
    'env-ci',
    'haikunator',
    '@types/aws-lambda',
  ],
  devDeps: [
    'aws-cdk',
    '@aws-cdk/integ-tests-alpha',
    '@types/env-ci',
    'esbuild',
  ],
  gitignore: [
    'cdk.context.json',
  ],
  integrationTestAutoDiscover: true,
});

// Fixes: https://github.com/projen/projen/issues/1347
const cdkConfig = new CdkConfig(project, {
  app: '', // Required for types.
  watchIncludes: [
    `${project.srcdir}/**/*.ts`,
    `${project.testdir}/**/*.integ.ts`,
  ],
});
cdkConfig.json.addDeletionOverride('app');
cdkConfig.json.addDeletionOverride('context');
cdkConfig.json.addDeletionOverride('output');

project.synth();