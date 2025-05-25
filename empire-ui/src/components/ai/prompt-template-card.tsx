import React, { useState, useMemo } from "react";

interface PromptTemplateCardProps {
  title: string;
  description?: string;
  template: string;
  onChange?: (updatedTemplate: string) => void;
  onTestChange?: (filledValues: Record<string, string>) => void;
}

function extractVariables(template: string): string[] {
  const regex = /{{\s*(\w+)\s*}}/g;
  const vars = new Set<string>();
  let match;
  while ((match = regex.exec(template))) {
    vars.add(match[1]);
  }
  return Array.from(vars);
}

function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, v) => values[v] || "");
}

export const PromptTemplateCard: React.FC<PromptTemplateCardProps> = ({
  title,
  description = "",
  template,
  onChange,
  onTestChange,
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editTemplate, setEditTemplate] = useState(template);
  const [testValues, setTestValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(true);

  const variables = useMemo(() => extractVariables(editTemplate), [editTemplate]);
  const preview = useMemo(() => interpolate(editTemplate, testValues), [editTemplate, testValues]);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTemplate(e.target.value);
    setSaved(false);
    onChange?.(e.target.value);
  };

  const handleTestValueChange = (v: string, value: string) => {
    const updated = { ...testValues, [v]: value };
    setTestValues(updated);
    onTestChange?.(updated);
  };

  const handleSave = () => {
    setSaved(true);
    onChange?.(editTemplate);
  };

  const handleReset = () => {
    setEditTitle(title);
    setEditDescription(description);
    setEditTemplate(template);
    setTestValues({});
    setSaved(true);
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl animate-fade-in flex flex-col gap-4">
      <input
        className="text-xl font-semibold bg-transparent outline-none border-b border-transparent focus:border-blue-400 transition-colors mb-1"
        value={editTitle}
        onChange={e => setEditTitle(e.target.value)}
        placeholder="Template Title"
        aria-label="Template Title"
      />
      <input
        className="text-sm text-gray-500 dark:text-gray-300 bg-transparent outline-none border-b border-transparent focus:border-blue-300 transition-colors mb-2"
        value={editDescription}
        onChange={e => setEditDescription(e.target.value)}
        placeholder="Short description (optional)"
        aria-label="Template Description"
      />
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Prompt Template</label>
      <textarea
        className="w-full min-h-[80px] rounded-md border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 p-2 text-sm font-mono focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
        value={editTemplate}
        onChange={handleTemplateChange}
        placeholder="Enter your prompt template with {{variables}}..."
        aria-label="Prompt Template"
      />
      {variables.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">Test Variables</span>
          {variables.map(v => (
            <input
              key={v}
              className="w-full rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 text-sm font-mono focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              value={testValues[v] || ""}
              onChange={e => handleTestValueChange(v, e.target.value)}
              placeholder={v}
              aria-label={v}
            />
          ))}
        </div>
      )}
      <div className="mt-4">
        <span className="text-xs text-gray-500 dark:text-gray-400">Live Preview</span>
        <div className="mt-1 p-3 rounded bg-gray-100 dark:bg-zinc-800 text-sm font-mono text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-zinc-700 transition-all animate-fade-in">
          {preview || <span className="text-gray-400">(Preview will appear here)</span>}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
          onClick={handleSave}
          disabled={saved}
        >
          Save
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PromptTemplateCard; 