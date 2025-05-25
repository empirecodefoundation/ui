'use client';
import dynamic from "next/dynamic";
const LoadingThoughtBubbleExampleDynamic = dynamic(
  () => import("./LoadingThoughtBubbleExample"),
  { ssr: false }
);
export default LoadingThoughtBubbleExampleDynamic; 