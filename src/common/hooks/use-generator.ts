import { Template } from '../utils/types';
import { Generator } from '../utils/generator';
import { useMemo } from 'react';

export const useGenerator = (template: Template) => {
  return useMemo(() => new Generator(template), [JSON.stringify(template)]);
};
