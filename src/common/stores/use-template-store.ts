import { create } from 'zustand';
import { Template } from '../utils/types';

export type UseTemplateStore = {
  template: Template | null;
  setTemplate: (template: Template | null) => void;
};

export const useTemplateStore = create<UseTemplateStore>((set) => ({
  template: null,
  setTemplate: (template) => set({ template }),
}));
