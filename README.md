<div>
    <p align="center">
        <img src="./assets/tempo-logo.png" align="center"  />
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

Library used to programmatically build markdown documents, with a heavy tilt toward [GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/).

## Getting Started

Install the library and you can begin to use it in your application(s).

_This is a GitHub Package and your application must support installing internal GitHub packages before you can use this package._

**npm**

```shell
npm install @joggr/tempo
```

**yarn**

```shell
yarn add @joggr/tempo
```

## Usage

```typescript
import fs from 'node:fs/promises';
import tempo from '@joggrdocs/tempo';

const result = tempo()
  .h1('Hello World')
  .paragraph('Some things')
  .paragraph((txt) => 
    txt
      .plainText('A sentence with')
      .bold('bolded words')
      .plainText('and')
      .italic('italicized words')
      .plainText('.')
      .build()
  )
  .h2((txt) => 
    txt 
      .plainText('A')
      .italic('table')
  )
  .table([
    ['name', 'email'],
    ['Zac', 'zac@acmecorp.com']
  ])
  .toString();

fs.writeFile('myFile.md', result)
  .then(() => {
    console.log('DONE');
  });
```

## Serialized Data (⚠️ Unstable API ⚠️)

Tempo creates a syntax tree that can be serialized and stored in a data base.

```typescript
import db from 'db/orm';
import tempo from '@joggrdocs/tempo';

const result = tempo()
  .h1('Hello World')
  .paragraph('Some things')
  .paragraph((txt) => 
    txt
      .plainText('A sentence with')
      .bold('bolded words')
      .plainText('and')
      .italic('italicized words')
      .plainText('.')
      .build()
  )
  .toJSON();

// Example of storing a serializable data object to the DB
await db.collection('tempoDoc').findAndSave(1, result);
```

## License

Licensed under MIT.

<br>
<hr>
<h2 align="center">
    Want to sign up for Joggr?
</h2>
<p align="center">
    We'd love to have you join, but we are in closed beta. <br> You can join our waitlist below.
</p>
<p align="center">
  <a href="https://www.joggr.io/waitlist?utm_source=github&utm_medium=org-readme&utm_campaign=static-docs">
    <img src="https://cdn.joggr.io/assets/static/badges/joggr-waitlist.svg" width="250px" alt="Join the Waitlist" />
  </a>
</p>