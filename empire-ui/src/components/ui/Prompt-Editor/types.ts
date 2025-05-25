// src/components/ai/prompt-editor/types.ts

export type PromptVariable = {
  name: string;
  type: 'string' | 'number' | 'boolean';
  defaultValue?: string | number | boolean;
};

export type PromptTemplate = {
  id: string;
  name: string;
  content: string;
  variables: PromptVariable[];
  createdAt: string;
  updatedAt: string;
};

export type TestOutput = {
  input: Record<string, string | number | boolean>;
  result: string;
  success: boolean;
  timestamp: string;
};

export type VersionHistoryItem = {
  versionId: string;
  timestamp: string;
  content: string;
  variables: PromptVariable[];
  note?: string;
};

export type ExportedPrompt = {
  template: PromptTemplate;
  versions: VersionHistoryItem[];
};
