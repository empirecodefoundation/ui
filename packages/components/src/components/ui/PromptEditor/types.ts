export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
}

export type PromptEditorVariant = "primary" | "secondary" | "outline";
export type PromptEditorSize = "sm" | "md" | "lg";

export interface PromptEditorProps {
  /** OpenAI API key for testing prompts */
  openAIApiKey: string;
  /** Callback when template is saved */
  onSave?: (template: PromptTemplate) => void;
  /** Callback with test results */
  onTest?: (result: string) => void;
  /** Theme mode */
  theme?: "light" | "dark";
  /** Additional CSS class */
  className?: string;
  /** Initial template data */
  initialTemplate?: PromptTemplate;
  /** Visual variant of the component */
  variant?: PromptEditorVariant;
  /** Size of the component */
  size?: PromptEditorSize;
}
