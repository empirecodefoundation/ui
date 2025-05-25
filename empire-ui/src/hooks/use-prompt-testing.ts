// src/hooks/use-prompt-testing.ts

import { PromptTemplate, TestOutput } from '@/components/ai/prompt-editor/types';

export const usePromptTesting = () => {
  const runPromptTest = (template: PromptTemplate): TestOutput => {
    const compiledPrompt = template.content.replace(/{{(.*?)}}/g, (_, varName) => {
      const variable = template.variables.find((v) => v.name === varName.trim());
      return String(variable?.defaultValue ?? `{{${varName}}}`);
    });

    const output: TestOutput = {
      input: Object.fromEntries(template.variables.map((v) => [v.name, v.defaultValue ?? ''])),
      result: `🤖 Mock AI Output:\n${compiledPrompt}`,
      success: true,
      timestamp: new Date().toISOString(),
    };

    return output;
  };

  return { runPromptTest };
};
