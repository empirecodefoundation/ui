import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CodePreview from "./code-preview";
import CodeRenderer from "./code-renderer";
import { extractCodeFromFilePath } from "@/lib/code";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

type ComponentInstallProps = {
  cli: string;
  componentFilePath: string;
  routeFilePath?: string;
  dependencies?: string;
  globalCssPath?: string;
  wrapperFilePath?: string;
};

export default function ComponentInstall({
  componentFilePath,
  routeFilePath,
  dependencies,
  cli,
  globalCssPath,
  wrapperFilePath,
}: ComponentInstallProps) {
  const ComponentFileContent = extractCodeFromFilePath(
    `src/components/${componentFilePath}.tsx`
  );
  let routeFileContent: string = "";
  if (routeFilePath) {
    routeFileContent = extractCodeFromFilePath(
      `src/app/api/${routeFilePath}/route.ts`
    );
  }

  let cssContent: string = "";
  if (globalCssPath) {
    cssContent = extractCodeFromFilePath(
      `src/components/${globalCssPath}`
    );
  }

  let wrapperFileContent: string = "";
  if (wrapperFilePath) {
    wrapperFileContent = extractCodeFromFilePath(
      `src/components/${wrapperFilePath}.tsx`
    );
  }

  const dependencyCommand = `npm i ${dependencies!}`;
  const cliCommand = cli;

  return (
    <div className="not-prose relative z-0 flex items-center justify-between pb-3">
      <Tabs defaultValue="cli" className="relative mr-auto w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="component">Component</TabsTrigger>
          {routeFilePath && <TabsTrigger value="route">API route</TabsTrigger>}
          {globalCssPath && <TabsTrigger value="css">CSS</TabsTrigger>}
          {wrapperFilePath && <TabsTrigger value="wrapper">Wrapper</TabsTrigger>}
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
                <code className="bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white px-1 max-w-fit rounded-xl overflow-x-auto">{`components/ui/${componentFilePath}.tsx`}</code>

                <CodePreview code={ComponentFileContent}>
                  <CodeRenderer code={ComponentFileContent} lang="tsx" />
                </CodePreview>
              </div>
            </div>
          </div>
        </TabsContent>
        {routeFilePath && (
          <TabsContent value="route" className="border-0 border-l">
            <div>
              <div className="border-l-[6px] border-white pl-6 mb-5">
                <div>Copy the API route into your project.</div>
              </div>

              <div className="flex flex-col space-y-6 ml-7 border-zinc-800">
                <code className="bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white px-1 max-w-fit rounded-xl overflow-x-auto">{`app/api/${routeFilePath}.ts`}</code>

                <CodePreview code={routeFileContent}>
                  <CodeRenderer code={routeFileContent} lang="tsx" />
                </CodePreview>
              </div>
            </div>
          </TabsContent>
        )}
        {globalCssPath && (
          <TabsContent value="css" className="border-0 border-l">
            <div>
              <div className="border-l-[6px] border-white pl-6 mb-5">
                <div>Add these CSS styles to your global CSS file.</div>
              </div>

              <div className="flex flex-col space-y-6 ml-7 border-zinc-800">
                <code className="bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white px-1 max-w-fit rounded-xl overflow-x-auto">app/global.css</code>

                <CodePreview code={cssContent}>
                  <CodeRenderer code={cssContent} lang="css" />
                </CodePreview>
              </div>
            </div>
          </TabsContent>
        )}
        {wrapperFilePath && (
          <TabsContent value="wrapper" className="border-0 border-l">
            <div>
              <div className="border-l-[6px] border-white pl-6 mb-5">
                <div>Copy the wrapper component into your project.</div>
                <div><span className="underline">Wrap your layout.tsx</span> file with it to load the component styles.</div>
              </div>

              <div className="flex flex-col space-y-6 ml-7 border-zinc-800">
                <code className="bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white px-1 max-w-fit rounded-xl overflow-x-auto">{`components/${wrapperFilePath}.tsx`}</code>

                <CodePreview code={wrapperFileContent}>
                  <CodeRenderer code={wrapperFileContent} lang="tsx" />
                </CodePreview>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
