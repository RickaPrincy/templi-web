import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { Template } from '@/gen/templi-web-api-client';
import { unwrap } from '@/common/utils/unwrap';
import { TemplateConfig } from '@/common/utils/types';

export const useGetConfiguration = (template: Template) => {
  return useQuery<TemplateConfig>({
    queryKey: ['templates', template],
    queryFn: () =>
      unwrap(() => (template ? axios.get(template.configUrl) : undefined)),
    refetchOnWindowFocus: false,
  });
};
