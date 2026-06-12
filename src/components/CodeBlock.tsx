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
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 font-mono z-10"
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>
      <pre
        className="text-[13px] font-mono leading-6 overflow-x-auto p-4 text-gray-300"
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

function highlightCode(code: string, lang?: string): string {
  const escaped = escapeHtml(code);

  if (lang === "curl" || !lang) {
    return escaped
      .replace(/((?:^|\s)-[A-Za-z]+)/g, '<span style="color:#93c5fd">$1</span>')
      .replace(
        /&#39;([^&#]*)&#39;/g,
        '<span style="color:#6ee7b7">&#39;$1&#39;</span>',
      )
      .replace(
        /&quot;([^&]*)&quot;/g,
        '<span style="color:#6ee7b7">&quot;$1&quot;</span>',
      )
      .replace(/^(curl)/m, '<span style="color:#c084fc">$1</span>');
  }

  if (lang === "javascript") {
    return escaped
      .replace(
        /\b(const|let|var|await|async|return|import|from|function)\b/g,
        '<span style="color:#c084fc">$1</span>',
      )
      .replace(
        /&quot;([^&]*)&quot;/g,
        '<span style="color:#6ee7b7">&quot;$1&quot;</span>',
      )
      .replace(
        /&#39;([^&#]*)&#39;/g,
        '<span style="color:#6ee7b7">&#39;$1&#39;</span>',
      )
      .replace(
        /\b(true|false|null)\b/g,
        '<span style="color:#f59e0b">$1</span>',
      )
      .replace(/\b(\d+)\b/g, '<span style="color:#93c5fd">$1</span>');
  }

  if (lang === "python") {
    return escaped
      .replace(
        /\b(import|from|def|return|async|await|True|False|None)\b/g,
        '<span style="color:#c084fc">$1</span>',
      )
      .replace(
        /&quot;([^&]*)&quot;/g,
        '<span style="color:#6ee7b7">&quot;$1&quot;</span>',
      )
      .replace(
        /&#39;([^&#]*)&#39;/g,
        '<span style="color:#6ee7b7">&#39;$1&#39;</span>',
      )
      .replace(/\b(\d+)\b/g, '<span style="color:#93c5fd">$1</span>');
  }

  if (lang === "axios") {
    return escaped
      .replace(
        /\b(import|const|let|var|await|async|return|from)\b/g,
        '<span style="color:#c084fc">$1</span>',
      )
      .replace(
        /&quot;([^&]*)&quot;/g,
        '<span style="color:#6ee7b7">&quot;$1&quot;</span>',
      )
      .replace(
        /&#39;([^&#]*)&#39;/g,
        '<span style="color:#6ee7b7">&#39;$1&#39;</span>',
      );
  }

  return escaped
    .replace(
      /"([^"]+)":/g,
      '<span style="color:#93c5fd">&quot;$1&quot;</span>:',
    )
    .replace(
      /: "([^"]*)"/g,
      ': <span style="color:#6ee7b7">&quot;$1&quot;</span>',
    )
    .replace(/: (true|false|null)/g, ': <span style="color:#f59e0b">$1</span>')
    .replace(/: (\d+)/g, ': <span style="color:#fb923c">$1</span>');
}
