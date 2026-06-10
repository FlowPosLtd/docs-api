import React from "react";
import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import { markdocConfig } from "../markdoc/config";
import { CodeBlock } from "./CodeBlock";

function Heading({
  level,
  children,
}: {
  level: number;
  children: React.ReactNode;
}) {
  if (level === 1) return <h1 className="t-title mb-2">{children}</h1>;
  if (level === 2) return <h2 className="t-heading mt-10 mb-3">{children}</h2>;
  if (level === 3)
    return <h3 className="t-subheading mt-6 mb-2">{children}</h3>;
  return <h4 className="t-subheading mt-4 mb-1">{children}</h4>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="t-body mb-4">{children}</p>;
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="t-code">{children}</code>;
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink-primary">{children}</strong>;
}

function Em({ children }: { children: React.ReactNode }) {
  return <em className="italic">{children}</em>;
}

function Hr() {
  return <hr className="border-line my-8" />;
}

function List({
  ordered,
  children,
}: {
  ordered: boolean;
  children: React.ReactNode;
}) {
  if (ordered) {
    return <ol className="space-y-2 mb-4 ml-1">{children}</ol>;
  }
  return (
    <ul className="space-y-2 mb-4 ml-1 list-disc list-inside">{children}</ul>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-3 t-body-sm">{children}</li>;
}

function CodePanel({
  language,
  label,
  children,
}: {
  language: string;
  label?: string;
  children: React.ReactNode;
}) {
  const code = React.Children.toArray(children)
    .map((c) => (typeof c === "string" ? c : ""))
    .join("");

  return (
    <div className="bg-pitch-900 rounded-lg border border-pitch-600 overflow-hidden mb-4">
      {label && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-pitch-600">
          <span className="text-xs text-pitch-400 font-mono">{label}</span>
        </div>
      )}
      <CodeBlock language={language} code={code.trim()} />
    </div>
  );
}

function Callout({
  type = "info",
  title,
  children,
}: {
  type: "info" | "warning" | "danger" | "success";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: {
      wrapper: "bg-accent-faint border-accent-muted text-accent-ink",
      icon: "text-accent",
      svg: (
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      ),
    },
    warning: {
      wrapper: "bg-put-wash border-put-wash-dark text-ink-primary",
      icon: "text-put",
      svg: (
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      ),
    },
    danger: {
      wrapper: "bg-danger-faint border-danger-border text-danger-ink",
      icon: "text-danger",
      svg: (
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      ),
    },
    success: {
      wrapper: "bg-get-wash border-get-wash-dark text-get",
      icon: "text-get",
      svg: (
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      ),
    },
  };

  const s = styles[type];

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-lg border mb-4 ${s.wrapper}`}
    >
      <svg
        className={`w-5 h-5 shrink-0 mt-0.5 ${s.icon}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        {s.svg}
      </svg>
      <div className="text-sm">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

const components = {
  Heading,
  Paragraph,
  InlineCode,
  Strong,
  Em,
  Hr,
  List,
  ListItem,
  CodePanel,
  Callout,
};

export function MarkdocRenderer({ content }: { content: string }) {
  const ast = Markdoc.parse(content);
  const tree = Markdoc.transform(ast, markdocConfig);
  return (
    <div>
      {Markdoc.renderers.react(tree as RenderableTreeNode, React, {
        components,
      })}
    </div>
  );
}
