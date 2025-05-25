import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect method with matchers from jest-dom
expect.extend(matchers);

// Cleanup after each test case
afterEach(() => {
  cleanup();
});
