import { paramCase } from 'param-case';
import { IStaticWebsitePreviewNamingToken } from './tokens';

export interface IStaticWebsitePreviewNamingStrategy {
  /**
   * Sub-domain name that will be used for the preview deployment.
   */
  name: string;
}

export class StaticWebsitePreviewNamingStrategy implements IStaticWebsitePreviewNamingStrategy {
  /**
   * Set a static name for your deployment.
   */
  static fromStaticName(name: string): IStaticWebsitePreviewNamingStrategy {
    return new StaticWebsitePreviewNamingStrategy(name);
  }

  /**
   * Crafts a name from an array of token values.
   */
  static fromTokens(...tokens: IStaticWebsitePreviewNamingToken[]): IStaticWebsitePreviewNamingStrategy {
    return new StaticWebsitePreviewNamingStrategy(tokens.map(({ token }) => token).join('-'));
  }

  /**
   * Sub-domain that will be used to host the preview.
   */
  public name: string;

  private constructor (name: string) {
    this.name = paramCase(name);
  }
}