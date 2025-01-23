"use client";

import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeEditor = ({code}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="relative bg-gray-900 p-4 rounded-lg text-white">
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded"
      >
      {copied ? "Copied!" : "Copy"}
      </button>
      <SyntaxHighlighter language="javascript" style={dracula} showLineNumbers>
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeEditor;
