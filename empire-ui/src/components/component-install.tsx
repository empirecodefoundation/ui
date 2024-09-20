import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CodePreview from "./code-preview";
import CodeRenderer from "./code-renderer";
import { extractCodeFromFilePath } from "@/lib/code";

type ComponentInstallProps = {
  cli: string;
  componentFilePath: string;
  routeFilePath?: string;
  dependencies?: string;
};

export default function ComponentInstall({
  componentFilePath,
  routeFilePath,
  dependencies,
  cli,
}: ComponentInstallProps) {
  const ComponentFileContent = extractCodeFromFilePath(
    `src/components/${componentFilePath}.tsx`
  );
  const routeFileContent = extractCodeFromFilePath(
    `src/app/api/${routeFilePath}/route.ts`
  );
  const dependencyCommand = `npm i ${dependencies!}`;
  const cliCommand = cli;

  return (
    <div className="not-prose relative z-0 flex items-center justify-between pb-3">
      <Tabs defaultValue="cli" className="relative mr-auto w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="component">Component</TabsTrigger>
          <TabsTrigger value="route">API route</TabsTrigger>
        </TabsList>
        <TabsContent value="cli" className="rounded-xl">
          <CodePreview code={cliCommand}>
            <CodeRenderer code={cliCommand} lang="tsx" />
          </CodePreview>
        </TabsContent>
        <TabsContent value="component" className="border-0 border-l">
          <div className="flex flex-col space-y-8">
            <div>
              <div className="border-l-[6px] border-white pl-6 mb-5">
                <div>Install dependencies.</div>
              </div>

              <div className="flex flex-col space-y-6 ml-7 border-zinc-800">
                <CodePreview code={dependencyCommand}>
                  <CodeRenderer code={dependencyCommand} lang="tsx" />
                </CodePreview>
              </div>
            </div>

            <div>
              <div className="border-l-[6px] border-white pl-6 mb-5">
                <div>Copy the component code into your project.</div>
              </div>

              <div className="flex flex-col space-y-6 ml-7 border-zinc-800">
                <code className="bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white px-1 w-fit rounded-xl">{`components/ui/${componentFilePath}.tsx`}</code>

                <CodePreview code={ComponentFileContent}>
                  <CodeRenderer code={ComponentFileContent} lang="tsx" />
                </CodePreview>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="route" className="border-0 border-l">
          <div>
            <div className="border-l-[6px] border-white pl-6 mb-5">
              <div>Copy the API route into your project.</div>
            </div>

            <div className="flex flex-col space-y-6 ml-7 border-zinc-800">
              <code className="bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white px-1 w-fit rounded-xl">{`app/api/${routeFilePath}.ts`}</code>

              <CodePreview code={routeFileContent}>
                <CodeRenderer code={routeFileContent} lang="tsx" />
              </CodePreview>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
