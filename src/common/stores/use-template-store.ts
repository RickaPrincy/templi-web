import { create } from 'zustand';
import { Template } from '@/gen/templi-web-api-client';

export type UseTemplateStore = {
  template: Template | null;
  setTemplate: (template: Template | null) => void;
};

export const useTemplateStore = create<UseTemplateStore>((set) => ({
  template: null,
  setTemplate: (template) => set({ template }),
}));
