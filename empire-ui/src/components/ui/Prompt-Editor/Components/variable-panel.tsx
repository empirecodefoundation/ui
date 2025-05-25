// src/components/ai/prompt-editor/components/variable-panel.tsx

import React from 'react';
import { PromptVariable } from '../types';

type VariablePanelProps = {
  variables: PromptVariable[];
  onVariableChange: (name: string, value: string | number | boolean) => void;
};

export const VariablePanel: React.FC<VariablePanelProps> = ({
  variables,
  onVariableChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">🔧 Variables</h3>
      {variables.length === 0 && <p className="text-sm text-gray-500">No variables defined.</p>}
      {variables.map((variable) => (
        <div key={variable.name} className="flex flex-col gap-1">
          <label className="text-sm font-medium">{variable.name}</label>
          {variable.type === 'boolean' ? (
            <select
              value={String(variable.defaultValue)}
              onChange={(e) => onVariableChange(variable.name, e.target.value === 'true')}
              className="p-2 border rounded-md"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          ) : (
            <input
              type={variable.type === 'number' ? 'number' : 'text'}
              value={String(variable.defaultValue ?? '')}
              onChange={(e) =>
                onVariableChange(variable.name, variable.type === 'number' ? Number(e.target.value) : e.target.value)
              }
              className="p-2 border rounded-md"
            />
          )}
        </div>
      ))}
    </div>
  );
};
