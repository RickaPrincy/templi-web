import { Template } from '@/gen/templi-web-api-client';
import { toSnakeCase } from './typos';

//TODO: path
export class Generator {
  constructor(private readonly template: Template) {}

  normalizedName() {
    return toSnakeCase(this.template.name);
  }

  generate() {
    const baseCommand = `templi generate -t ${this.template.url} -o ${this.normalizedName()}`;
    return baseCommand;
  }

  linkUrl() {
    return `${this.template.url}/tree/main`;
  }
}
