// src/components/ai/prompt-editor/prompt-editor.tsx

import React from 'react';
import { usePromptEditor } from '@/hooks/use-prompt-editor';
import { VariablePanel } from './components/variable-panel';
import { TemplateSelector } from './components/template-selector';
import { TestPanel } from './components/test-panel';
import { VersionHistory } from './components/version-history';
import { ExportImport } from './components/export-import';

export const PromptEditor = () => {
  const {
    currentTemplate,
    variables,
    testResults,
    onVariableChange,
    onTemplateChange,
    onTestPrompt,
    onSaveVersion,
    onImport,
    onExport,
  } = usePromptEditor();

  return (
    <div className="flex flex-col gap-6 p-6 rounded-2xl bg-white shadow-lg w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold">🧠 Prompt Editor</h2>

      <TemplateSelector
        currentTemplate={currentTemplate}
        onTemplateChange={onTemplateChange}
      />

      <VariablePanel
        variables={variables}
        onVariableChange={onVariableChange}
      />

      <TestPanel
        template={currentTemplate}
        variables={variables}
        onTestPrompt={onTestPrompt}
        testResults={testResults}
      />

      <VersionHistory
        currentTemplate={currentTemplate}
        onSaveVersion={onSaveVersion}
      />

      <ExportImport
        onExport={() => onExport(currentTemplate)}
        onImport={onImport}
      />
    </div>
  );
};
