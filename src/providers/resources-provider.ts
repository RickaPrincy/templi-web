import { GenerateProjectPayload, Template } from '@/gen/templi-web-api-client';
import { Pagination } from './types';
import { resourcesApi } from './api';
import { unwrap } from '@/common/utils/unwrap';

export const resourcesProvider = {
  async getTemplates(filter?: Record<string, any>, pagination?: Pagination) {
    return unwrap(() =>
      resourcesApi().getTemplates(
        filter?.name || undefined,
        pagination?.page,
        pagination?.pageSize
      )
    );
  },
  async crupdateTemplates(templates: Template[]) {
    return unwrap(() => resourcesApi().crupdateTemplates(templates));
  },
  async generateWithTemplate(
    payload: GenerateProjectPayload,
    meta?: Record<string, any>
  ) {
    return unwrap(() =>
      resourcesApi().generateProject(meta?.templateId, payload)
    );
  },
  async getInstallationId(meta?: Record<string, any>, pagination?: Pagination) {
    return unwrap(() =>
      resourcesApi().getInstallationsByUserId(
        meta?.userId,
        pagination?.page,
        pagination?.pageSize
      )
    );
  },
  async getTemplateById(id: string) {
    return unwrap(() => resourcesApi().getTemplateById(id));
  },
};
