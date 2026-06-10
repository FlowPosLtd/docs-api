import Markdoc, { type Config } from "@markdoc/markdoc";

const nodes: Config["nodes"] = {
  heading: {
    render: "Heading",
    attributes: {
      level: { type: Number },
    },
    transform(node, config) {
      const level = node.attributes.level as number;
      return new Markdoc.Tag(
        "Heading",
        { level },
        node.transformChildren(config),
      );
    },
  },

  paragraph: {
    render: "Paragraph",
    transform(node, config) {
      return new Markdoc.Tag("Paragraph", {}, node.transformChildren(config));
    },
  },

  code: {
    render: "InlineCode",
    transform(node) {
      return new Markdoc.Tag("InlineCode", {}, [node.attributes.content]);
    },
  },

  fence: {
    render: "CodePanel",
    attributes: {
      language: { type: String },
      label: { type: String },
    },
    transform(node) {
      return new Markdoc.Tag("CodePanel", {
        language: node.attributes.language ?? "text",
        label: node.attributes.label ?? null,
        code: node.attributes.content ?? "",
      }, []);
    },
  },

  list: {
    render: "List",
    attributes: {
      ordered: { type: Boolean },
    },
    transform(node, config) {
      return new Markdoc.Tag(
        "List",
        { ordered: node.attributes.ordered },
        node.transformChildren(config),
      );
    },
  },

  item: {
    render: "ListItem",
    transform(node, config) {
      return new Markdoc.Tag("ListItem", {}, node.transformChildren(config));
    },
  },

  strong: {
    render: "Strong",
    transform(node, config) {
      return new Markdoc.Tag("Strong", {}, node.transformChildren(config));
    },
  },

  em: {
    render: "Em",
    transform(node, config) {
      return new Markdoc.Tag("Em", {}, node.transformChildren(config));
    },
  },

  hr: {
    render: "Hr",
    transform() {
      return new Markdoc.Tag("Hr", {}, []);
    },
  },
};

// ---------------------------------------------------------------------------
// Custom tags
// ---------------------------------------------------------------------------
const tags: Config["tags"] = {
  callout: {
    render: "Callout",
    attributes: {
      type: {
        type: String,
        default: "info",
        matches: ["info", "warning", "danger", "success"],
      },
      title: { type: String },
    },
    transform(node, config) {
      return new Markdoc.Tag(
        "Callout",
        { type: node.attributes.type ?? "info", title: node.attributes.title },
        node.transformChildren(config),
      );
    },
  },

  // Dark code panel with optional header label + language tag
  "code-panel": {
    render: "CodePanel",
    attributes: {
      language: { type: String, default: "text" },
      label: { type: String },
    },
    transform(node) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function getText(n: any): string {
        if (n.type === "text") return String(n.attributes?.content ?? "");
        if (n.type === "softbreak") return "\n";
        // backslash-newline in markdown becomes a hardbreak — restore it for code
        if (n.type === "hardbreak") return "\\\n";
        if (Array.isArray(n.children)) {
          const s = n.children.map(getText).join("");
          return n.type === "paragraph" ? s + "\n" : s;
        }
        return "";
      }
      const code = node.children.map(getText).join("").trim();
      return new Markdoc.Tag("CodePanel", {
        language: node.attributes.language ?? "text",
        label: node.attributes.label,
        code,
      }, []);
    },
  },
};

export const markdocConfig: Config = { nodes, tags };
