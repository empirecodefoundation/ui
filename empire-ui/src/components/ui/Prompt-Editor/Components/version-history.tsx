// src/components/ai/prompt-editor/components/version-history.tsx

import React, { useState } from 'react';
import { PromptTemplate, VersionHistoryItem } from '../types';

type VersionHistoryProps = {
  currentTemplate: PromptTemplate;
  onSaveVersion: (note?: string) => void;
};

export const VersionHistory: React.FC<VersionHistoryProps> = ({
  currentTemplate,
  onSaveVersion,
}) => {
  const [note, setNote] = useState('');
  const [history, setHistory] = useState<VersionHistoryItem[]>([]);

  const handleSave = () => {
    onSaveVersion(note);
    setHistory((prev) => [
      ...prev,
      {
        versionId: `v${prev.length + 1}`,
        timestamp: new Date().toISOString(),
        content: currentTemplate.content,
        variables: currentTemplate.variables,
        note,
      },
    ]);
    setNote('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">🕘 Version History</h3>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Version note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="flex-1 p-2 border rounded-md"
        />
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Save Version
        </button>
      </div>

      <ul className="text-sm space-y-2">
        {history.map((v) => (
          <li
            key={v.versionId}
            className="p-3 border rounded-md bg-gray-50 shadow-sm"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{v.versionId}</span>
              <span className="text-xs text-gray-500">{new Date(v.timestamp).toLocaleString()}</span>
            </div>
            {v.note && <p className="text-gray-600 mt-1">{v.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};
