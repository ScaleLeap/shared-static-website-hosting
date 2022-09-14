import assert from 'assert';
import { Aws } from 'aws-cdk-lib';
import ci from 'env-ci';

function fromCI(name: 'branch' | 'commit' | 'build' | 'job' | 'pr' | 'slug'): IStaticWebsitePreviewNamingToken {
  const c = ci();

  if (name in c) {
    const val = c[name];

    if (val) {
      return new StaticWebsitePreviewNamingToken(val);
    }
  }

  throw new Error(`The value for "${name}" is not set.`);
}

export interface IStaticWebsitePreviewNamingToken {
  token: string;
}

export class StaticWebsitePreviewNamingToken implements IStaticWebsitePreviewNamingToken {
  /**
   * Provide an arbitrary string.
   */
  static fromString(val: string): IStaticWebsitePreviewNamingToken {
    return new StaticWebsitePreviewNamingToken(val);
  }

  /**
   * AWS Account ID into which this construct is deployed.
   */
  static get AWS_ACCOUNT_ID(): IStaticWebsitePreviewNamingToken {
    return new StaticWebsitePreviewNamingToken(Aws.ACCOUNT_ID);
  }

  /**
   * AWS region into which this construct is deployed.
   */
  static get AWS_REGION(): IStaticWebsitePreviewNamingToken {
    return new StaticWebsitePreviewNamingToken(Aws.REGION);
  }

  /**
   * AWS stack name into which this construct is deployed.
   */
  static get AWS_STACK_NAME(): IStaticWebsitePreviewNamingToken {
    return new StaticWebsitePreviewNamingToken(Aws.STACK_NAME);
  }

  /**
   * Git branch being built or targeted by a Pull Request.
   *
   * @see https://github.com/semantic-release/env-ci#supported-variables
   */
  static get CI_BRANCH_NAME(): IStaticWebsitePreviewNamingToken {
    return fromCI('branch');
  }

  /**
   * Commit sha that triggered the CI build.
   *
   * @see https://github.com/semantic-release/env-ci#supported-variables
   */
  static get CI_COMMIT_SHA(): IStaticWebsitePreviewNamingToken {
    return fromCI('commit');
  }

  /**
   * CI service build number.
   *
   * @see https://github.com/semantic-release/env-ci#supported-variables
   */
  static get CI_BUILD(): IStaticWebsitePreviewNamingToken {
    return fromCI('build');
  }

  /**
   * CI service job number.
   *
   * @see https://github.com/semantic-release/env-ci#supported-variables
   */
  static get CI_JOB(): IStaticWebsitePreviewNamingToken {
    return fromCI('job');
  }

  /**
   * Pull Request number (only for builds triggered by a Pull Request).
   *
   * @see https://github.com/semantic-release/env-ci#supported-variables
   */
  static get CI_PR(): IStaticWebsitePreviewNamingToken {
    return fromCI('pr');
  }

  /**
   * The slug (in form: owner_name/repo_name) of the repository currently being built.
   */
  static get CI_SLUG(): IStaticWebsitePreviewNamingToken {
    return fromCI('slug');
  }

  constructor (public readonly token: string = '') {}
}