import { unwrap } from '@/common/utils/unwrap';
import { resourcesApi } from './api';
import { Pagination } from './types';

export const githubInstallationProvider = {
  async findAll(args: { pagination?: Pagination; meta: { userId: string } }) {
    const { meta, pagination } = args;
    return unwrap(() =>
      resourcesApi().getInstallationsByUserId(
        meta?.userId,
        pagination?.page ?? 1,
        pagination?.pageSize ?? 50
      )
    );
  },
};
