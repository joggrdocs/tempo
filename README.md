<div>
    <p align="center">
        <img src="https://github.com/joggrdocs/tempo/blob/main/assets/tempo-logo.png" align="center"  />
    </p>
    <hr>
    <blockquote align="center">
        "Running gives freedom. When you run you can determine your own tempo. You can choose your own course and think whatever you want. Nobody tells you what to do." - Nina Kuscsik
    </blockquote>
</div>

<br>

<div align="center">
  <a href="https://badge.fury.io/js/@joggr%2Ftempo">
    <img src="https://badge.fury.io/js/@joggr%2Ftempo.svg" alt="npm version">
  </a>
  <a href="https://github.com/joggrdocs/tempo/actions/workflows/github-code-scanning/codeql">
    <img alt="CodeQL" src="https://github.com/joggrdocs/tempo/actions/workflows/github-code-scanning/codeql/badge.svg">
  </a>
  <a href="https://github.com/joggrdocs/tempo/actions/workflows/pkg-npm-publish.yaml">
    <img alt="Publish to npm" src="https://github.com/joggrdocs/tempo/actions/workflows/pkg-npm-publish.yaml/badge.svg">
  </a>
  <br />
  <a href="https://github.com/joggrdocs/tempo/actions/workflows/ci.yaml">
    <img alt="CI" src="https://github.com/joggrdocs/tempo/actions/workflows/ci.yaml/badge.svg">
  </a>
  <a href="https://biomejs.dev">
    <img alt="Static Badge" src="https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome">
  </a>
</div>

## Overview

A set of libraries used to programmatically build markdown documents, with a heavy tilt toward [GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/).

- 🦄 Programmatically generate docs for `CI` or `commit-hooks` 
- 📋 Create reusable templates for your projects
- 🤖 Build templates for standardizing output from LLMs
- 🐱 Use all the goodness of [GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/)

## Usage

```typescript
import fs from 'node:fs/promises';
import tempo from '@joggr/tempo';

const doc = tempo()
  .h1('Hello, World!')
  .p('This is a test document.')
  .toString();

await fs.writeFile('test.md', doc);
```

## Libraries

- 🏃 [`@joggr/tempo`](/packages/tempo): A TypeScript library used to programmatically build markdown documents

## License

Licensed under MIT.

<br>
<hr>
<h2 align="center">
    Want to sign up for Joggr? Check us out at <a href="https://joggr.io">Joggr</a>
</h2>

