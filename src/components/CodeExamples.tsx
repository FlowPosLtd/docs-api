import { useState, useMemo, memo } from "react";
import { CodeBlock } from "./CodeBlock";
import { generateCode, LANGUAGE_LABELS } from "../utils/code-gen";
import type { Endpoint } from "../types";
import type { Language } from "../utils/code-gen";

const LANGUAGES: Language[] = ["curl", "javascript", "python", "axios"];

interface CodeExamplesProps {
  endpoint: Endpoint;
  apiKey: string;
  pathValues?: Record<string, string>;
  queryValues?: Record<string, string>;
  bodyValues?: Record<string, string>;
  onTryIt?: () => void;
  isTryItOpen?: boolean;
}

export const CodeExamples = memo(function CodeExamples({
  endpoint,
  apiKey,
  pathValues = {},
  queryValues = {},
  bodyValues = {},
  onTryIt,
  isTryItOpen,
}: CodeExamplesProps) {
  const [lang, setLang] = useState<Language>("curl");

  const code = useMemo(
    () => generateCode(endpoint, lang, apiKey, pathValues, queryValues, bodyValues),
    [endpoint, lang, apiKey, pathValues, queryValues, bodyValues],
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-4 pt-4 gap-1 border-b border-code pb-0">
        {LANGUAGES.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-2 text-xs font-medium rounded-t transition-colors ${
              lang === l
                ? "text-code bg-code-head border-b-2 border-blue-500"
                : "text-code-dim hover:text-code"
            }`}
          >
            {LANGUAGE_LABELS[l]}
          </button>
        ))}
        {onTryIt && (
          <button
            onClick={onTryIt}
            className={`ml-auto px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              isTryItOpen
                ? "bg-blue-600 text-white"
                : "bg-code-head text-code-muted hover:text-code border border-code"
            }`}
          >
            {isTryItOpen ? "← Code" : "Try it ▶"}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        <CodeBlock code={code} language={lang} />
      </div>
    </div>
  );
});
