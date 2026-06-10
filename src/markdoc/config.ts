import Markdoc, { type Config } from '@markdoc/markdoc';

// ---------------------------------------------------------------------------
// Node overrides — map standard Markdown AST nodes to our design system classes
// ---------------------------------------------------------------------------
const nodes: Config['nodes'] = {
  heading: {
    render: 'Heading',
    attributes: {
      level: { type: Number },
    },
    transform(node, config) {
      const level = node.attributes.level as number;
      return new Markdoc.Tag('Heading', { level }, node.transformChildren(config));
    },
  },

  paragraph: {
    render: 'Paragraph',
    transform(node, config) {
      return new Markdoc.Tag('Paragraph', {}, node.transformChildren(config));
    },
  },

  code: {
    render: 'InlineCode',
    transform(node) {
      return new Markdoc.Tag('InlineCode', {}, [node.attributes.content]);
    },
  },

  fence: {
    render: 'CodePanel',
    attributes: {
      language: { type: String },
      label: { type: String },
    },
    transform(node, config) {
      return new Markdoc.Tag(
        'CodePanel',
        {
          language: node.attributes.language ?? 'text',
          label: node.attributes.label ?? null,
        },
        node.transformChildren(config),
      );
    },
  },

  list: {
    render: 'List',
    attributes: {
      ordered: { type: Boolean },
    },
    transform(node, config) {
      return new Markdoc.Tag(
        'List',
        { ordered: node.attributes.ordered },
        node.transformChildren(config),
      );
    },
  },

  item: {
    render: 'ListItem',
    transform(node, config) {
      return new Markdoc.Tag('ListItem', {}, node.transformChildren(config));
    },
  },

  strong: {
    render: 'Strong',
    transform(node, config) {
      return new Markdoc.Tag('Strong', {}, node.transformChildren(config));
    },
  },

  em: {
    render: 'Em',
    transform(node, config) {
      return new Markdoc.Tag('Em', {}, node.transformChildren(config));
    },
  },

  hr: {
    render: 'Hr',
    transform() {
      return new Markdoc.Tag('Hr', {}, []);
    },
  },
};

// ---------------------------------------------------------------------------
// Custom tags
// ---------------------------------------------------------------------------
const tags: Config['tags'] = {
  callout: {
    render: 'Callout',
    attributes: {
      type: {
        type: String,
        default: 'info',
        matches: ['info', 'warning', 'danger', 'success'],
      },
      title: { type: String },
    },
    transform(node, config) {
      return new Markdoc.Tag(
        'Callout',
        { type: node.attributes.type ?? 'info', title: node.attributes.title },
        node.transformChildren(config),
      );
    },
  },

  // Dark code panel with optional header label + language tag
  'code-panel': {
    render: 'CodePanel',
    attributes: {
      language: { type: String, default: 'text' },
      label: { type: String },
    },
    transform(node, config) {
      return new Markdoc.Tag(
        'CodePanel',
        { language: node.attributes.language, label: node.attributes.label },
        node.transformChildren(config),
      );
    },
  },
};

export const markdocConfig: Config = { nodes, tags };
