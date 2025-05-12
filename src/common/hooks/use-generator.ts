import { Generator } from '../utils/generator';
import { useMemo } from 'react';
import { Template } from '@/gen/templi-web-api-client';

export const useGenerator = (template: Template) => {
  return useMemo(() => new Generator(template), [JSON.stringify(template)]);
};
