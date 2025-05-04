import { Template } from './types';
import { toSnakeCase } from './typos';

export class Generator {
  constructor(private readonly template: Template) {}

  normalizedName() {
    return toSnakeCase(this.template.name);
  }

  generate() {
    const baseCommand = `templi generate -t ${this.template.url} -o ${this.normalizedName()}`;
    if (this.template.path) {
      return baseCommand + ` -p ${this.template.path}`;
    }
    return baseCommand;
  }

  linkUrl() {
    const suffix = this.template.path ? `/${this.template.path}` : '';
    return `${this.template.url.replace('.git', '')}/tree/main${suffix}`;
  }
}
