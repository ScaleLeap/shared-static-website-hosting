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
  license: 'MIT',
  devDeps: [
    '@types/aws-lambda',
    '@aws-cdk/integ-tests-alpha',
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

/**
 * A hack to remove the integratio test from the overall test process.
 *
 * These tests are executed in CI, and require acccess to AWS.
 *
 * > Need to perform AWS calls for account 000000000, but no credentials have been configured
 *
 * Can't figure out another way to disable the integ tests from being injected into the test task.
 */
project.testTask.steps.forEach((step) => {
  if (step.spawn?.startsWith('integ:')) {
    Object.assign(step, { spawn: 'true' });
  }
});

project.synth();