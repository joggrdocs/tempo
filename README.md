<div>
    <p align="center">
        <img src="/logo.png" align="center" width="240" />
    </p>
    <hr>
</div>

> The wise speak only of what they know.

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
