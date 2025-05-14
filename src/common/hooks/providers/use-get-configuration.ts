import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { Template } from '@/gen/templi-web-api-client';
import { TemplateConfig } from '@/common/utils/types';
import { unwrap } from '@/common/utils/unwrap';
import { useGenerator } from '../use-generator';

export const useGetConfiguration = (template: Template) => {
  const generator = useGenerator(template);

  return useQuery<TemplateConfig>({
    queryKey: ['templates', template],
    queryFn: () =>
      unwrap(() =>
        template ? axios.get(generator.getRawConfigUrl()) : undefined
      ),
    refetchOnWindowFocus: false,
  });
};
