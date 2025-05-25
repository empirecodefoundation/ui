// src/hooks/use-prompt-editor.ts

import { useState } from 'react';
import { PromptTemplate, PromptVariable, TestOutput, ExportedPrompt } from '@/components/ai/prompt-editor/types';
import { usePromptTesting } from './use-prompt-testing';
import { usePromptStorage } from './use-prompt-storage';

const defaultTemplate: PromptTemplate = {
  id: 'default-template',
  name: 'Default Prompt',
  content: 'Hello, {{name}}!',
  variables: [{ name: 'name', type: 'string', defaultValue: 'Adi' }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const usePromptEditor = () => {
  const [currentTemplate, setCurrentTemplate] = useState<PromptTemplate>(defaultTemplate);
  const [testResults, setTestResults] = useState<TestOutput[]>([]);

  const { runPromptTest } = usePromptTesting();
  const { savePromptVersion, getTemplates, saveTemplate, loadExportedPrompt } = usePromptStorage();

  const onVariableChange = (name: string, value: string | number | boolean) => {
    const updatedVars = currentTemplate.variables.map((v) =>
      v.name === name ? { ...v, defaultValue: value } : v
    );
    setCurrentTemplate({ ...currentTemplate, variables: updatedVars });
  };

  const onTemplateChange = (templateId: string) => {
    const selected = getTemplates().find((t) => t.id === templateId);
    if (selected) setCurrentTemplate(selected);
  };

  const onTestPrompt = () => {
    const result = runPromptTest(currentTemplate);
    setTestResults((prev) => [...prev, result]);
  };

  const onSaveVersion = (note?: string) => {
    savePromptVersion(currentTemplate, note);
  };

  const onExport = (): ExportedPrompt => ({
    template: currentTemplate,
    versions: [], // Replace with real version history logic if stored
  });

  const onImport = (data: ExportedPrompt) => {
    setCurrentTemplate(data.template);
  };

  return {
    currentTemplate,
    variables: currentTemplate.variables,
    testResults,
    onVariableChange,
    onTemplateChange,
    onTestPrompt,
    onSaveVersion,
    onExport,
    onImport,
  };
};
