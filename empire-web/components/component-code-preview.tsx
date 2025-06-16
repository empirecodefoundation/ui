import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CodePreview from "./code-preview";
import CodeRenderer from "./code-renderer";
import ComponentPreview from "./component-preview";
import { extractCodeFromFilePath } from "@/lib/code";

type ComponentCodePreview = {
  component: React.ReactElement;
  filePath?: string;
  name?: string;
  hasReTrigger?: boolean;
  classNameComponentContainer?: string;
};

export default function ComponentCodePreview({
  component,
  filePath,
  name,
  hasReTrigger,
  classNameComponentContainer,
}: ComponentCodePreview) {
  // Use name as filePath if filePath is not provided
  const componentFilePath = filePath || name;
  // Only try to extract code if we have a valid path
  const fileContent = componentFilePath 
    ? extractCodeFromFilePath(`src/components/${componentFilePath}.tsx`)
    : "// Component code not available";

  return (
    <div className="not-prose relative z-0 flex items-center justify-between pb-3">
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="rounded-[7px]">
          <ComponentPreview
            component={component}
            hasReTrigger={hasReTrigger}
            className={classNameComponentContainer}
          />
        </TabsContent>
        <TabsContent value="code" className="rounded-[7px]">
          <CodePreview code={fileContent}>
            <CodeRenderer code={fileContent} lang="tsx" />
          </CodePreview>
        </TabsContent>
      </Tabs>
    </div>
  );
}
