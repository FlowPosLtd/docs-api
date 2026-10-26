---
title: Your article title
description: One sentence that says what the reader gets out of it.
date: 2026-01-31
audience: businesses        # businesses | developers | everyone
tags: [orders, how-to]
author: FlowPOS team
---

Files starting with "_" are never published. Copy this file, rename it to the
URL you want (e.g. `fulfillment-pipelines.md` becomes
`/articles/fulfillment-pipelines`), and fill it in.

Don't add a `# Title` heading: the page shows the title from the front matter.
Start with `##` for sections.

## A section

Write in plain English, with an example for each idea.

{% callout type="info" title="Good to know" %}
Callouts work here, the same as in the rest of the docs.
{% /callout %}

{% code-panel language="curl" label="Example request" %}
curl -X GET 'https://api.flowpos.co.uk/v1/orders' \
 -H 'x-api-key: your_api_key_here'
{% /code-panel %}
