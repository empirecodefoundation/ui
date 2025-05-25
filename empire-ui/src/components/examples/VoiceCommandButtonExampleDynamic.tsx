'use client';
import dynamic from "next/dynamic";
const VoiceCommandButtonExampleDynamic = dynamic(
  () => import("./VoiceCommandButtonExample"),
  { ssr: false }
);
export default VoiceCommandButtonExampleDynamic; 