import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../../shared/Card";
import { Input } from "../../shared/Input";
import { Button } from "../../shared/Button";
import { useApi } from "../../../hooks/useApi";
import { useTheme } from "../../../hooks/useTheme";
import { clsx } from "clsx";
import type { PromptEditorProps, PromptTemplate } from "./types";

/**
 * PromptEditor Component
 *
 * A powerful and flexible component for creating, editing, and testing AI prompts with variable support.
 *
 * @example
 * ```tsx
 * <PromptEditor
 *   openAIApiKey="your-api-key"
 *   onSave={(template) => console.log(template)}
 *   onTest={(result) => console.log(result)}
 * />
 * ```
 */
export const PromptEditor: React.FC<PromptEditorProps> = ({
  openAIApiKey,
  onSave,
  onTest,
  theme: propTheme,
  className = "",
  initialTemplate,
  variant = "primary",
  size = "md",
}) => {
  const { theme } = useTheme(propTheme);
  const [template, setTemplate] = useState<PromptTemplate>(
    initialTemplate || {
      id: crypto.randomUUID(),
      name: "New Template",
      content: "",
      variables: [],
    }
  );
  const [variableValues, setVariableValues] = useState<Record<string, string>>(
    {}
  );
  const { callApi, isLoading, error } = useApi<{
    choices: { text: string }[];
  }>();

  const extractVariables = useCallback((content: string) => {
    const matches = content.match(/\{\{([^}]+)\}\}/g) || [];
    return matches.map((match) => match.slice(2, -2));
  }, []);

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      const variables = extractVariables(newContent);
      setTemplate((prev) => ({
        ...prev,
        content: newContent,
        variables,
      }));
    },
    [extractVariables]
  );

  const handleVariableChange = useCallback(
    (variable: string, value: string) => {
      setVariableValues((prev) => ({
        ...prev,
        [variable]: value,
      }));
    },
    []
  );

  const handleTest = useCallback(async () => {
    if (!template.content.trim()) return;

    let processedContent = template.content;
    template.variables.forEach((variable) => {
      processedContent = processedContent.replace(
        new RegExp(`\\{\\{${variable}\\}\\}`, "g"),
        variableValues[variable] || ""
      );
    });

    try {
      const response = await callApi("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAIApiKey}`,
        },
        body: {
          model: "text-davinci-003",
          prompt: processedContent,
          max_tokens: 150,
          temperature: 0.7,
        },
      });

      onTest?.(response.choices[0].text);
    } catch (error) {
      console.error("Failed to test prompt:", error);
    }
  }, [template, variableValues, openAIApiKey, callApi, onTest]);

  const handleSave = useCallback(() => {
    onSave?.(template);
  }, [template, onSave]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleTest();
      }
    },
    [handleTest]
  );

  return (
    <Card
      theme={theme}
      className={clsx("w-full max-w-2xl", className)}
      title="Prompt Editor"
      subtitle="Create and test AI prompts with variables"
    >
      <div className="flex flex-col gap-4">
        <Input
          value={template.name}
          onChange={(e) =>
            setTemplate((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Template Name"
          theme={theme}
          aria-label="Template name"
          size={size}
          variant={variant}
        />
        <div className="relative min-h-[200px]">
          <textarea
            value={template.content}
            onChange={handleContentChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter your prompt template here. Use {{variable}} for variables."
            className={clsx(
              "w-full min-h-[200px] p-3 rounded-lg border text-sm leading-relaxed resize-y",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-200 text-gray-900"
            )}
            aria-label="Prompt template content"
          />
        </div>

        {template.variables.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3
              className={clsx(
                "text-sm font-medium",
                theme === "dark" ? "text-gray-100" : "text-gray-900"
              )}
            >
              Variables
            </h3>
            {template.variables.map((variable) => (
              <Input
                key={variable}
                value={variableValues[variable] || ""}
                onChange={(e) => handleVariableChange(variable, e.target.value)}
                placeholder={`Enter value for ${variable}`}
                theme={theme}
                aria-label={`Value for ${variable}`}
                size={size}
                variant={variant}
              />
            ))}
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            onClick={handleTest}
            disabled={isLoading || !template.content.trim()}
            theme={theme}
            aria-label="Test prompt"
            size={size}
          >
            Test Prompt
          </Button>
          <Button
            variant={variant}
            onClick={handleSave}
            disabled={!template.content.trim()}
            theme={theme}
            aria-label="Save template"
            size={size}
          >
            Save Template
          </Button>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}
      </div>
    </Card>
  );
};

export default PromptEditor;
