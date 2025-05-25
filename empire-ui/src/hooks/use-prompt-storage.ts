// src/hooks/use-prompt-storage.ts

import { PromptTemplate, ExportedPrompt, VersionHistoryItem } from '@/components/ai/prompt-editor/types';

const STORAGE_KEY = 'prompt-editor-templates';

export const usePromptStorage = () => {
  const getTemplates = (): PromptTemplate[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const saveTemplate = (template: PromptTemplate) => {
    const templates = getTemplates();
    const index = templates.findIndex((t) => t.id === template.id);
    if (index >= 0) {
      templates[index] = template;
    } else {
      templates.push(template);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  };

  const savePromptVersion = (template: PromptTemplate, note?: string) => {
    const versionsKey = `${STORAGE_KEY}-versions-${template.id}`;
    const history: VersionHistoryItem[] = JSON.parse(localStorage.getItem(versionsKey) || '[]');

    const newVersion: VersionHistoryItem = {
      versionId: `v${history.length + 1}`,
      timestamp: new Date().toISOString(),
      content: template.content,
      variables: template.variables,
      note,
    };

    const updatedHistory = [...history, newVersion];
    localStorage.setItem(versionsKey, JSON.stringify(updatedHistory));
  };

  const loadExportedPrompt = (data: ExportedPrompt): PromptTemplate => {
    saveTemplate(data.template);
    return data.template;
  };

  return {
    getTemplates,
    saveTemplate,
    savePromptVersion,
    loadExportedPrompt,
  };
};
