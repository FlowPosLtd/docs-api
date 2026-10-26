import React, { useMemo } from "react";
import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import { markdocConfig } from "../markdoc/config";
import { Link as RouterLink } from "react-router-dom";
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

type Children = { children?: React.ReactNode };

function Table({ children }: Children) {
  return (
    <div className="mb-6 overflow-x-auto rounded-lg border border-line">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  );
}
const THead = ({ children }: Children) => (
  <thead className="bg-canvas-subtle text-ink-primary">{children}</thead>
);
const TBody = ({ children }: Children) => (
  <tbody className="divide-y divide-line">{children}</tbody>
);
const Tr = ({ children }: Children) => <tr>{children}</tr>;
const Th = ({ children }: Children) => (
  <th className="px-4 py-2.5 font-semibold border-b border-line whitespace-nowrap">{children}</th>
);
const Td = ({ children }: Children) => (
  <td className="px-4 py-2.5 align-top text-ink-secondary">{children}</td>
);

/** Site links ("/api/orders") stay in the app; anything else opens in a new tab. */
function DocLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className = "text-accent-ink font-medium underline underline-offset-2 decoration-accent-border hover:decoration-accent";
  if (href.startsWith("/")) {
    return (
      <RouterLink to={href} className={className}>
        {children}
      </RouterLink>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
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
    return (
      <ol className="space-y-2 mb-4 pl-6 list-decimal marker:text-ink-tertiary">
        {children}
      </ol>
    );
  }
  return (
    <ul className="space-y-2 mb-4 pl-6 list-disc marker:text-ink-tertiary">
      {children}
    </ul>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  // Not a flex row: inline children (bold, code, links) would each become a
  // separate flex item, losing their spaces, and the list marker would go.
  return <li className="t-body-sm pl-1">{children}</li>;
}

function CodePanel({
  language,
  label,
  code: codeProp,
  children,
}: {
  language: string;
  label?: string;
  code?: string;
  children?: React.ReactNode;
}) {
  const code =
    codeProp !== undefined
      ? codeProp
      : React.Children.toArray(children)
          .map((c) => (typeof c === "string" ? c : ""))
          .join("");

  return (
    <div className="bg-code rounded-lg border border-code overflow-hidden mb-4">
      {label && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-code">
          <span className="text-xs text-code-muted font-mono">{label}</span>
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
      wrapper: "bg-danger-faint border-danger-muted text-danger-ink",
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
  DocLink,
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  List,
  ListItem,
  CodePanel,
  Callout,
};

export function MarkdocRenderer({ content }: { content: string }) {
  const tree = useMemo(() => {
    const ast = Markdoc.parse(content);
    return Markdoc.transform(ast, markdocConfig);
  }, [content]);

  return (
    <div>
      {Markdoc.renderers.react(tree as RenderableTreeNode, React, { components })}
    </div>
  );
}
