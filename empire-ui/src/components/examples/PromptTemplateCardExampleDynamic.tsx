'use client';
import dynamic from "next/dynamic";
const PromptTemplateCardExampleDynamic = dynamic(
  () => import("./PromptTemplateCardExample"),
  { ssr: false }
);
export default PromptTemplateCardExampleDynamic; 