import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    hr: ({ ...props }) => <hr className="mt-2 mb-6" {...props} />,
    code: (props) => (
      <code
        className="bg-gray-800 text-pink-400 rounded px-1 py-0.5 font-mono text-sm"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto"
        {...props}
      />
    ),
    table: (props) => (
      <table
        className="min-w-min border-collapse text-left table-auto"
        {...props}
      />
    ),
    th: (props) => (
      <th
        className="border dark:border-zinc-800 px-4 py-2 text-sm font-bold text-gray-300"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="border dark:border-zinc-800 px-4 py-2 text-sm text-black dark:text-white"
        {...props}
      />
    ),
    tr: (props) => <tr className="hover:bg-gray-800" {...props} />,
  };
}
