"use client";

import React, { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Copy,
  Play,
  Plus,
  X,
  Save,
  Download,
  Upload,
  MessageSquare,
  Check,
} from "lucide-react";
import { toast } from "sonner";

// Types
export interface Variable {
  name: string;
  value: string;
  description?: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  variables: Variable[];
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TestResult {
  id: string;
  timestamp: Date;
  prompt: string;
  response: string;
  model: string;
  tokenCount: number;
}

export interface PromptEditorProps {
  onSave?: (template: PromptTemplate) => void;
  onTest?: (prompt: string, model: string) => Promise<string>;
  templates?: PromptTemplate[];
  className?: string;
  defaultModel?: string;
  availableModels?: { value: string; label: string }[];
}

const DEFAULT_MODELS = [
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
];

const DEFAULT_TEMPLATES: PromptTemplate[] = [
  {
    id: "1",
    name: "Code Review Assistant",
    content:
      "Review the following {{language}} code and provide suggestions for improvement:\n\n```{{language}}\n{{code}}\n```\n\nFocus on:\n- Code quality\n- Performance\n- Security\n- Best practices",
    variables: [
      {
        name: "language",
        value: "javascript",
        description: "Programming language",
      },
      { name: "code", value: "", description: "Code to review" },
    ],
    category: "development",
  },
  {
    id: "2",
    name: "Content Summarizer",
    content:
      "Summarize the following {{content_type}} in {{length}} sentences:\n\n{{content}}\n\nKey points to highlight:\n- Main ideas\n- Important details\n- Actionable insights",
    variables: [
      {
        name: "content_type",
        value: "article",
        description: "Type of content",
      },
      { name: "length", value: "3", description: "Number of sentences" },
      { name: "content", value: "", description: "Content to summarize" },
    ],
    category: "content",
  },
];

export const PromptEditor: React.FC<PromptEditorProps> = ({
  onSave,
  onTest,
  templates = [],
  className = "",
  defaultModel = "gpt-4o-mini",
  availableModels = DEFAULT_MODELS,
}) => {
  const [prompt, setPrompt] = useState("");
  const [variables, setVariables] = useState<Variable[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<PromptTemplate | null>(
    null
  );
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const [templateName, setTemplateName] = useState("");
  const [templateCategory, setTemplateCategory] = useState("general");
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allTemplates = [...DEFAULT_TEMPLATES, ...templates];

  const processPrompt = (rawPrompt: string, vars: Variable[]): string => {
    let processed = rawPrompt;
    vars.forEach((variable) => {
      const pattern = new RegExp(`\\{\\{${variable.name}\\}\\}`, "g");
      processed = processed.replace(pattern, variable.value);
    });
    return processed;
  };

  const insertVariable = (variableName: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end);
    const variableText = `{{${variableName}}}`;

    setPrompt(before + variableText + after);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + variableText.length,
        start + variableText.length
      );
    }, 0);
  };

  const addVariable = () => {
    const newVariable: Variable = {
      name: `var_${variables.length + 1}`,
      value: "",
      description: "",
    };
    setVariables([...variables, newVariable]);
  };

  const updateVariable = (
    index: number,
    field: keyof Variable,
    value: string
  ) => {
    const updated = variables.map((variable, i) =>
      i === index ? { ...variable, [field]: value } : variable
    );
    setVariables(updated);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const testPrompt = async () => {
    if (!onTest) {
      toast.error("Test function not provided");
      return;
    }

    const processedPrompt = processPrompt(prompt, variables);
    setIsLoading(true);

    try {
      const response = await onTest(processedPrompt, selectedModel);
      const result: TestResult = {
        id: Date.now().toString(),
        timestamp: new Date(),
        prompt: processedPrompt,
        response,
        model: selectedModel,
        tokenCount: Math.ceil(processedPrompt.length / 4),
      };

      setTestResults([result, ...testResults.slice(0, 4)]);
      toast.success("Prompt tested successfully!");
    } catch (error) {
      toast.error("Failed to test prompt");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTemplate = () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

    const template: PromptTemplate = {
      id: Date.now().toString(),
      name: templateName,
      content: prompt,
      variables,
      category: templateCategory,
    };

    if (onSave) {
      onSave(template);
      toast.success("Template saved successfully!");
      setTemplateName("");
    } else {
      toast.error("Save function not provided");
    }
  };

  const loadTemplate = (template: PromptTemplate) => {
    setPrompt(template.content);
    setVariables([...template.variables]);
    setCurrentTemplate(template);
    setTemplateName(template.name);
    setTemplateCategory(template.category);
    toast.success(`Loaded template: ${template.name}`);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const exportTemplate = () => {
    if (!currentTemplate && !templateName) {
      toast.error("No template to export");
      return;
    }

    const template = currentTemplate || {
      id: Date.now().toString(),
      name: templateName || "Untitled",
      content: prompt,
      variables,
      category: templateCategory,
    };

    const dataStr = JSON.stringify(template, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${template.name.replace(/\s+/g, "_")}.json`;
    link.click();

    toast.success("Template exported successfully!");
  };

  const importTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const template = JSON.parse(
          e.target?.result as string
        ) as PromptTemplate;
        loadTemplate(template);
        toast.success("Template imported successfully!");
      } catch (error) {
        toast.error("Invalid template file");
      }
    };
    reader.readAsText(file);
  };

  const getCharacterCount = () => {
    const processed = processPrompt(prompt, variables);
    return {
      raw: prompt.length,
      processed: processed.length,
      tokens: Math.ceil(processed.length / 4),
    };
  };

  const counts = getCharacterCount();

  return (
    <div className={`max-w-7xl mx-auto p-6 ${className}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Prompt Editor</h1>
        <p className="text-gray-600">
          Create, test, and manage AI prompts with variables and templates
        </p>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editor */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Editor</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{counts.processed} chars</span>
                    <span>~{counts.tokens} tokens</span>
                  </div>
                </div>

                <Textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Write your prompt here... Use {{variable_name}} for dynamic content"
                  className="min-h-[300px] mb-4"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Select
                      value={selectedModel}
                      onValueChange={setSelectedModel}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableModels.map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            {model.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={testPrompt}
                      disabled={!prompt.trim() || isLoading}
                      size="sm"
                    >
                      {isLoading ? (
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      Test
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(processPrompt(prompt, variables))
                    }
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {variables.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Preview
                    </h3>
                    <div className="text-sm text-gray-600 whitespace-pre-wrap font-mono">
                      {processPrompt(prompt, variables) || "No content"}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Variables & Templates */}
            <div className="space-y-6">
              {/* Variables */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Variables</h2>
                  <Button size="sm" onClick={addVariable}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                {variables.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No variables yet</p>
                    <p className="text-xs mt-1">
                      Add variables to make prompts dynamic
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {variables.map((variable, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Input
                            value={variable.name}
                            onChange={(e) =>
                              updateVariable(index, "name", e.target.value)
                            }
                            placeholder="Variable name"
                            className="text-sm font-mono"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeVariable(index)}
                            className="ml-2 text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <Input
                          value={variable.description}
                          onChange={(e) =>
                            updateVariable(index, "description", e.target.value)
                          }
                          placeholder="Description (optional)"
                          className="text-xs mb-2"
                        />

                        <Textarea
                          value={variable.value}
                          onChange={(e) =>
                            updateVariable(index, "value", e.target.value)
                          }
                          placeholder="Value"
                          className="text-sm min-h-[60px] mb-2"
                        />

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => insertVariable(variable.name)}
                          className="w-full text-xs"
                        >
                          Insert {`{${variable.name}}`}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Save Template */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Save Template</h2>

                <div className="space-y-3">
                  <Input
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Template name"
                  />

                  <Select
                    value={templateCategory}
                    onValueChange={setTemplateCategory}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="content">Content</SelectItem>
                      <SelectItem value="analysis">Analysis</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2">
                    <Button onClick={saveTemplate} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={exportTemplate}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={importTemplate}
                    className="hidden"
                  />
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTemplates.map((template) => (
              <Card
                key={template.id}
                className="p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <Badge variant="outline" className="capitalize text-xs">
                    {template.category}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {template.content.substring(0, 120)}...
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {template.variables.length} variables
                  </span>
                  <Button size="sm" onClick={() => loadTemplate(template)}>
                    Load
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Test Results</h2>

            {testResults.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No test results yet</p>
                <p className="text-xs mt-1">
                  Test your prompts to see results here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {testResults.map((result) => (
                  <div
                    key={result.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {result.model}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            ~{result.tokenCount} tokens
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {result.timestamp.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Prompt
                        </h4>
                        <div className="bg-gray-50 rounded p-3 text-sm font-mono text-gray-600">
                          {result.prompt}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-700">
                            Response
                          </h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(result.response)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-gray-50 rounded p-3 text-sm text-gray-600">
                          {result.response}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptEditor;
