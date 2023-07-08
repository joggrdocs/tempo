<div>
    <p align="center">
        <img src="/logo.png" align="center" width="240" />
    </p>
    <hr>
    <blockquote align="center">
        "The wise speak only of what they know." - J.R.R Tolkien
    </blockquote>
</div>

<br>

<p align="center">
  <a href="https://github.com/joggrdocs/tolkien/actions/workflows/github-code-scanning/codeql">
    <img alt="CodeQL" src="https://github.com/joggrdocs/tolkien/actions/workflows/github-code-scanning/codeql/badge.svg">
  </a>
  <a href="https://github.com/joggrdocs/tolkien/actions/workflows/npm-publish.yaml">
    <img alt="Publish to npm" src="https://github.com/joggrdocs/tolkien/actions/workflows/npm-publish.yaml/badge.svg">
  </a>
  <a href="https://github.com/joggrdocs/tolkien/actions/workflows/ci.yaml">
    <img alt="CI" src="https://github.com/joggrdocs/tolkien/actions/workflows/ci.yaml/badge.svg">
  </a>
  <br/>
  <a href="https://github.com/standard/semistandard">
    <img alt="JS Semi-standard Style" src="https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img alt="Prettier Style" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
</p>

## Overview

Library used to programmatically build markdown documents, with a heavy tilt toward [GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/).

## Getting Started

Install the library and you can begin to use it in your application(s).

_This is a Github Package and your application must support installing internal Github packages before you can use this package._

**npm**

```shell
npm install @joggrdocs/tolkien
```

**yarn**

```shell
yarn add @joggrdocs/tolkien
```

## Usage

```typescript
import fs from 'node:fs/promises';
import tolkien from '@joggrdocs/tolkien';

const result = tolkien()
  .h1('Hello World')
  .text('Some things')
  .text((t) => 
    t
      .text('A sentence with')
      .bold('bolded words')
      .text('and')
      .italic('italicized words')
      .text('.')
      .build()
  )
  .h2((t) => 
    t
      .text('A')
      .italic('table')
  )
  .tables()
  .build();

fs.writeFile('myFile.md', result)
  .then(() => {
    console.log('DONE');
  });
```
