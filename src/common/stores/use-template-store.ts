import { create } from 'zustand';
import { Template } from '@/gen/templi-web-api-client';

export type UseTemplateStore = {
  isPersisted: boolean;
  template: Template | null;
  setTemplate: (template: Template | null, isPersisted?: boolean) => void;
};

export const useTemplateStore = create<UseTemplateStore>((set) => ({
  template: null,
  isPersisted: true,
  setTemplate: (template, isPersisted = true) => set({ template, isPersisted }),
}));
