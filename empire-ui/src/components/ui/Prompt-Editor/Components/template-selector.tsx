// src/components/ai/prompt-editor/components/template-selector.tsx

import React from 'react';
import { PromptTemplate } from '../types';

type TemplateSelectorProps = {
  currentTemplate: PromptTemplate;
  onTemplateChange: (templateId: string) => void;
};

const dummyTemplates: PromptTemplate[] = [
  {
    id: 'template-1',
    name: 'Email Responder',
    content: 'Write a reply to: {{message}}',
    variables: [{ name: 'message', type: 'string' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'template-2',
    name: 'Product Description Generator',
    content: 'Describe the product: {{productName}} in a witty tone.',
    variables: [{ name: 'productName', type: 'string' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  onTemplateChange,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">🧩 Template Selector</h3>
      <select
        value={currentTemplate.id}
        onChange={(e) => onTemplateChange(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        {dummyTemplates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
};
