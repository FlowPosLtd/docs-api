import { useState, useMemo, memo } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock = memo(function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = useMemo(() => highlightCode(code, language), [code, language]);

  return (
    <div className="relative group">
      <button
        onClick={copy}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded text-xs bg-code-head hover:bg-code-border border border-code text-code-muted font-mono z-10"
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>
      <pre
        className="text-[13px] font-mono leading-6 overflow-x-auto p-4 text-code"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const V = {
  keyword: "var(--code-syn-key)",
  string:  "var(--code-syn-string)",
  number:  "var(--code-syn-number)",
  bool:    "var(--code-syn-bool)",
  orange:  "var(--code-syn-orange)",
};

function span(color: string, content: string) {
  return `<span style="color:${color}">${content}</span>`;
}

function highlightCode(code: string, lang?: string): string {
  const escaped = escapeHtml(code);

  if (lang === "curl" || !lang) {
    return escaped
      .replace(/((?:^|\s)-[A-Za-z]+)/g, span(V.number, "$1"))
      .replace(/&#39;([^&#]*)&#39;/g, span(V.string, "&#39;$1&#39;"))
      .replace(/&quot;([^&]*)&quot;/g, span(V.string, "&quot;$1&quot;"))
      .replace(/^(curl)/m, span(V.keyword, "$1"));
  }

  if (lang === "javascript" || lang === "axios") {
    return escaped
      .replace(/\b(const|let|var|await|async|return|import|from|function)\b/g, span(V.keyword, "$1"))
      .replace(/&quot;([^&]*)&quot;/g, span(V.string, "&quot;$1&quot;"))
      .replace(/&#39;([^&#]*)&#39;/g, span(V.string, "&#39;$1&#39;"))
      .replace(/\b(true|false|null)\b/g, span(V.bool, "$1"))
      .replace(/\b(\d+)\b/g, span(V.number, "$1"));
  }

  if (lang === "python") {
    return escaped
      .replace(/\b(import|from|def|return|async|await|True|False|None)\b/g, span(V.keyword, "$1"))
      .replace(/&quot;([^&]*)&quot;/g, span(V.string, "&quot;$1&quot;"))
      .replace(/&#39;([^&#]*)&#39;/g, span(V.string, "&#39;$1&#39;"))
      .replace(/\b(\d+)\b/g, span(V.number, "$1"));
  }

  return escaped
    .replace(/"([^"]+)":/g, `${span(V.number, "&quot;$1&quot;")}:`)
    .replace(/: "([^"]*)"/g, `: ${span(V.string, "&quot;$1&quot;")}`)
    .replace(/: (true|false|null)/g, `: ${span(V.bool, "$1")}`)
    .replace(/: (\d+)/g, `: ${span(V.orange, "$1")}`);
}
