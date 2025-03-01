# Getting Started 

> "Running gives freedom. When you run you can determine your own **tempo**. You can choose your own course and think whatever you want. Nobody tells you what to do." <br/> - _Nina Kuscsik_

The primary goal of Tempo is to give developers the freedom to generate markdown content programmatically, and set their own pace.

## Overview

Tempo (defined as _the rate or speed of motion or activity; pace_) is a `npm` library for generating markdown programmatically. 

Tempo is designed to be simple, flexible, and extensible. Tempo is a great tool for generating documentation, LLM prompts/output, blog posts, and other markdown content.

## Installation

You can install Tempo using your favorite package manager. 

::: code-group

```bash [npm]
$ npm install @joggrdocs/tempo
```

```bash [Yarn]
$ yarn add @joggrdocs/tempo
```

```bash [pnpm]
$ pnpm install @joggrdocs/tempo
```

:::

## Usage

To use Tempo, you need to import the `tempo` function as the `default` import from the `@joggrdocs/tempo` package. 

```typescript
import tempo from '@joggrdocs/tempo';
```

You can then use the `tempo` function to create a `TempoDocument` object, and build your markdown content.

```typescript
const doc = tempo();

doc.h1('Hello, World!');
doc.p('This is a simple paragraph.');
doc.code('console.log("Hello, World!");');
```

> [!TIP]
> The `TempoDocument` object is stateful, so you can chain methods together to build your markdown content, or you can call the methods individually and store the result in a variable.

Once you are ready to generate the markdown content, you can call the `toString` method on the `TempoDocument` object.

```typescript
const markdown = doc.toString();
console.log(markdown); // Outputs the markdown content as a string
```