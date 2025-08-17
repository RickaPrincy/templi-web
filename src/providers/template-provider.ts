import {
  GenerateProjectPayload,
  GenerateWithPersistedTemplate,
} from '@/gen/templi-web-api-client';
import { Pagination } from './types';
import { resourcesApi } from './api';
import { unwrap } from '@/common/utils/unwrap';
import { authProvider } from './auth-provider';

export const TO_SIGNOUT_STATUS = [401, 403];
export const templateProvider = {
  async getTemplates(args: {
    filter?: { name: string; tags?: string[] };
    pagination?: Pagination;
  }) {
    const { pagination, filter } = args;
    return unwrap(() =>
      resourcesApi().getTemplates(
        filter?.name || undefined,
        filter?.tags ?? [],
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
    try {
      return await unwrap(() =>
        resourcesApi().generateProjectWithTemplate(meta.templateId, payload)
      );
    } catch (error) {
      const status = error?.status;
      if (TO_SIGNOUT_STATUS.includes(status)) {
        authProvider.logout();
      }
      throw error;
    }
  },
  async generateProject(args: { payload: GenerateProjectPayload }) {
    const { payload } = args;
    try {
      return await unwrap(() => resourcesApi().generateProject(payload));
    } catch (error) {
      const status = error?.status;
      if (TO_SIGNOUT_STATUS.includes(status)) {
        authProvider.logout();
      }
      throw error;
    }
  },
  async getTemplateById(id: string) {
    return unwrap(() => resourcesApi().getTemplateById(id));
  },
};
