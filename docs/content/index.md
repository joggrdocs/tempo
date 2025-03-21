---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "tempo"
  text: "Programmatically build markdown."
  tagline: A set of TypeScript libraries for building markdown.
  image:
    src: /images/tempo-icon.png
    alt: VitePress
  actions:
    - theme: brand
      text: Getting Started
      link: /guide
    - theme: alt
      text: Real-world Examples
      link: /examples

features:
  - icon: 
      src: /images/icons/markdown.png
    title: Programmatic Markdown
    details: Create markdown on the fly using a simple, intuitive API (with Types)
  - icon: 
      src: /images/icons/gha-blue.png
    title: CI Ready
    details: Generate markdown in your CI/CD pipeline, no need to manually update markdown files
  - icon: 
      src: /images/icons/chatgpt.png
    title: LLM Ready
    details: Create reusable templates for generating markdown or markdown-based prompts
---

## Usage

::: code-group

```ts [basic.ts]
import tempo from '@joggr/tempo';

/**
 * This is a simple example of using tempo to generate markdown.
 */
export default tempo()
  .h1('Hello, World!')
  .p('This is a paragraph.')
  .code('console.log("Hello, World!")')
  .toString();
```

```ts [template.ts]
import tempo from '@joggr/tempo';

/**
 * This is a simple example of using tempo to generate markdown as a function (template).
 */
export function createDocument(payload: {
  title: string,
  description: string,
  example?: string
}) {
  const doc = tempo()
    .h1(payload.title)
    .p(payload.description);
   
  if (payload.example) {
    doc.code(payload.example);
  }

  return doc.toString();
}
```