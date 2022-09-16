import { awscdk, javascript, SampleFile, TextFile } from 'projen';
import { CdkConfig } from 'projen/lib/awscdk';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Roman Filippov',
  authorAddress: 'roman@scaleleap.com',
  cdkVersion: '2.41.0',
  constructsVersion: '10.1.102',
  defaultReleaseBranch: 'main',
  name: '@scaleleap/cdk-shared-static-website-hosting',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/ScaleLeap/shared-static-website-hosting.git',
  deps: [
    '@types/aws-lambda',
  ],
  devDeps: [
    'aws-cdk',
    '@aws-cdk/integ-tests-alpha',
    '@types/env-ci',
    'esbuild',
    'dotenv',
  ],
  gitignore: [
    '.env',
    'cdk.context.json',
  ],
  integrationTestAutoDiscover: true,
});

const DOT_ENV_EXAMPLE: Record<string, string> = {
  AWS_ACCOUNT_ID: '000000000',
  ROOT_ZONE_NAME: 'foo.example.com',
};

const dotEnvExample = new TextFile(project, '.env.example', {
  lines: Object.entries(DOT_ENV_EXAMPLE).map((kv) => kv.join('=')),
});

new TextFile(project, `${project.testdir}/env.ts`, {
  lines: [
    "import 'dotenv/config';",
    ...Object.keys(DOT_ENV_EXAMPLE).map((key) => `export const ${key} = String(process.env.${key});`),
  ],
});

new SampleFile(project, '.env', {
  sourcePath: dotEnvExample.path,
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