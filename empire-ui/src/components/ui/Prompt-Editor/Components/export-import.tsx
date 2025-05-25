// src/components/ai/prompt-editor/components/export-import.tsx

import React, { useRef } from 'react';
import { ExportedPrompt } from '../types';

type ExportImportProps = {
  onExport: () => ExportedPrompt;
  onImport: (data: ExportedPrompt) => void;
};

export const ExportImport: React.FC<ExportImportProps> = ({ onExport, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = onExport();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${data.template.name.replace(/\s+/g, '_')}_prompt.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        onImport(json);
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">📦 Export / Import</h3>
      <div className="flex gap-4">
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Export Prompt
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImport}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Import Prompt
        </button>
      </div>
    </div>
  );
};
