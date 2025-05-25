// src/components/ai/prompt-editor/components/test-panel.tsx

import React from 'react';
import { PromptTemplate, PromptVariable, TestOutput } from '../types';

type TestPanelProps = {
  template: PromptTemplate;
  variables: PromptVariable[];
  onTestPrompt: () => void;
  testResults: TestOutput[];
};

export const TestPanel: React.FC<TestPanelProps> = ({
  template,
  variables,
  onTestPrompt,
  testResults,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">🧪 Test Prompt</h3>
        <button
          onClick={onTestPrompt}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Run Test
        </button>
      </div>

      <div className="p-4 border rounded-md bg-gray-50 whitespace-pre-wrap">
        <strong>Compiled Prompt:</strong>
        <p className="mt-2 text-sm text-gray-700">
          {template.content.replace(/{{(.*?)}}/g, (_, varName) => {
            const match = variables.find(v => v.name === varName.trim());
            return match ? String(match.defaultValue ?? '') : `{{${varName}}}`;
          })}
        </p>
      </div>

      {testResults.length > 0 && (
        <div>
          <h4 className="font-medium text-sm mb-2">Test Results</h4>
          {testResults.map((res, idx) => (
            <div
              key={idx}
              className={`p-3 border rounded-md mb-2 ${
                res.success ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
              }`}
            >
              <p className="text-sm text-gray-700">
                <strong>Result:</strong> {res.result}
              </p>
              <p className="text-xs text-gray-500">
                <em>{res.timestamp}</em>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
