import { Aws } from 'aws-cdk-lib';

export interface IStaticWebsitePreviewNamingToken {
  token: string;
}

export class StaticWebsitePreviewNamingToken implements IStaticWebsitePreviewNamingToken {
  static fromString(val: string): IStaticWebsitePreviewNamingToken {
    return new StaticWebsitePreviewNamingToken(val);
  }

  static get AWS_ACCOUNT_ID(): IStaticWebsitePreviewNamingToken {
    return new StaticWebsitePreviewNamingToken(Aws.ACCOUNT_ID);
  }

  static get AWS_REGION(): IStaticWebsitePreviewNamingToken {
    return new StaticWebsitePreviewNamingToken(Aws.REGION);
  }

  static get AWS_STACK_NAME(): IStaticWebsitePreviewNamingToken {
    return new StaticWebsitePreviewNamingToken(Aws.STACK_NAME);
  }

  constructor (public readonly token: string) {}
}