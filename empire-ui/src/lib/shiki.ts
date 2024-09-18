import { bundledLanguages, createHighlighter } from "shiki/bundle/web";
import { noir, min_dark } from "./custom-theme";

export const codeToHtml = async ({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) => {
  const highlighter = await createHighlighter({
    themes: [noir],
    langs: [...Object.keys(bundledLanguages)],
  });

  return highlighter.codeToHtml(code, {
    lang: lang,
    theme: "noir",
  });
};
