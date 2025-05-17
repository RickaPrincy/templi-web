import {
  GenerateProjectPayload,
  GenerateWithPersistedTemplate,
} from '@/gen/templi-web-api-client';
import { Pagination } from './types';
import { resourcesApi } from './api';
import { unwrap } from '@/common/utils/unwrap';

export const templateProvider = {
  async getTemplates(args: {
    filter?: { name: string };
    pagination?: Pagination;
  }) {
    const { pagination, filter } = args;
    return unwrap(() =>
      resourcesApi().getTemplates(
        filter?.name || undefined,
        pagination?.page,
        pagination?.pageSize
      )
    );
  },
  async generateWithTemplate(args: {
    payload: GenerateWithPersistedTemplate;
    meta: { templateId: string };
  }) {
    const { meta, payload } = args;
    return unwrap(() =>
      resourcesApi().generateProjectWithTemplate(meta.templateId, payload)
    );
  },
  async generateProject(args: { payload: GenerateProjectPayload }) {
    const { payload } = args;
    return unwrap(() => resourcesApi().generateProject(payload));
  },
  async getTemplateById(id: string) {
    return unwrap(() => resourcesApi().getTemplateById(id));
  },
};
