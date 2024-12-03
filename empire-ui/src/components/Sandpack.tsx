import { useState, useMemo } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { Code, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from './ui/button';
import { extractMDCodeBlock } from "@/lib/utils";

interface SandpackProps {
  readonly?: boolean;
  onVote?: (isUpvote: boolean) => void;
  hasVoted?: boolean;
  messages: any[];
}

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

export function Sandpack({ readonly = false, onVote, hasVoted, messages }: SandpackProps) {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const { codeToUse, userPrompt } = useMemo(() => {
    const lastMessage = messages[messages.length - 1];
    const secondLastMessage = messages[messages.length - 2];
    return {
      codeToUse: extractMDCodeBlock(lastMessage?.content) || lastMessage?.content || '',
      userPrompt: secondLastMessage?.content || ''
    };
  }, [messages]);

  return (
    <div className="w-full mx-auto border border-[#2F2E2E] rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1E1E1E] border-b border-[#2F2E2E]">
        <div className="flex-1 text-sm text-gray-300 italic truncate">{userPrompt}</div>
        <div className="flex items-center space-x-2">
          {!readonly && !hasVoted && (
            <>
              <Button
                variant="link"
                onClick={() => onVote?.(true)}
                className="text-white p-2 text-sm"
                aria-label="Upvote"
              >
                <ThumbsUp size={15} strokeWidth={2} />
              </Button>
              <Button
                variant="link"
                onClick={() => onVote?.(false)}
                className="text-white p-2 text-sm"
                aria-label="Downvote"
              >
                <ThumbsDown size={15} strokeWidth={2} />
              </Button>
            </>
          )}
          <Button
            variant="link"
            onClick={() => setIsCodeVisible(!isCodeVisible)}
            className="text-white p-2 text-sm flex items-center justify-center"
            aria-label={isCodeVisible ? 'Hide Code' : 'Show Code'}
          >
            <Code size={15} strokeWidth={3} />
          </Button>
        </div>
      </div>
      <SandpackProvider
        theme={sandpackDark}
        template="react-ts"
        options={{
          externalResources: ["https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css"],
          activeFile: "App.tsx",
        }}
        customSetup={{
          dependencies: {
            "framer-motion": "latest",
            "react-router-dom": "latest",
            "lucide-react": "latest",
            "react-helmet": "latest",
          },
        }}
        files={{
          "App.tsx": codeToUse,
          "/public/index.html": HTML_CONTENT,
          "App.css": "",
        }}
      >
        <SandpackLayout>
          {isCodeVisible && (
            <SandpackCodeEditor
              style={{ height: '600px' }}
              showTabs
              showRunButton={!readonly}
              showLineNumbers
              showInlineErrors
              wrapContent
              readOnly={readonly}
            />
          )}
          <SandpackPreview style={{ height: '600px' }} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
