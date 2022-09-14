import { paramCase } from 'param-case';

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
   * Sub-domain that will be used to host the preview.
   */
  public name: string;

  private constructor (name: string) {
    this.name = paramCase(name);
  }
}