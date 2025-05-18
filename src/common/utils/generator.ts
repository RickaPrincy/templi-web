import { Template } from '@/gen/templi-web-api-client';
import { toSnakeCase } from './typos';

const TEMPLI_CONFIG_NAME = 'templi.json';

export class Generator {
  constructor(private readonly template: Template) {}

  normalizedName() {
    return toSnakeCase(this.template.name);
  }

  generate() {
    const baseCommand = `templi generate -t ${this.template.url}.git ${this.template.scope ? `-s ${this.template.scope}` : ''} -o ${this.normalizedName()}`;
    return baseCommand;
  }

  linkUrl() {
    return `${this.template.url}/tree/main`;
  }

  getRawConfigUrl() {
    //TODO: review
    const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/?$/;
    const match = this.template.url.match(regex);

    if (!match) {
      throw new Error('URL GitHub invalide.');
    }

    const username = match[1];
    const repoName = match[2];
    const path = this.template.scope
      ? `${this.template.scope}/${TEMPLI_CONFIG_NAME}`
      : TEMPLI_CONFIG_NAME;

    return `https://raw.githubusercontent.com/${username}/${repoName}/main/${path}`;
  }
}
