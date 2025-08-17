import { unwrap } from '@/common/utils/unwrap';
import { resourcesApi } from './api';
import { Pagination } from './types';

export const tagProvider = {
  async getTags(args: { filter?: { name: string }; pagination?: Pagination }) {
    const { pagination, filter } = args;

    return unwrap(() =>
      resourcesApi().getTags(
        filter?.name || undefined,
        pagination?.page,
        pagination?.pageSize
      )
    );
  },
};
