import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-white mt-16">{children}</div>;
}
