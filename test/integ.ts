import { App, Stack } from 'aws-cdk-lib';
import { StaticWebsitePreview } from '../src/index';

const app = new App({
  analyticsReporting: false,
  autoSynth: true,
  treeMetadata: false,
});

const stack = new Stack(app);

new StaticWebsitePreview(stack, 'T1');
