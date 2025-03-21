# GitHub Action

This example demonstrates how you can generate a GitHub Action's README.md using Tempo.

## Getting Started

You will need to add Tempo to your project. You can do this by running the following command:

::: code-group

```bash [npm]
$ npm install --dev @joggr/tempo yaml
```

```bash [Yarn]
$ yarn add -D @joggr/tempo yaml
```

```bash [pnpm]
$ pnpm install --dev @joggr/tempo yaml
```

:::

## Adding the Script

Once you have added Tempo to your GitHub Action repository, you need to create a script that can parse the `action.yml` file and generate the `README.md` file.

Here is an example script that you can use:

```ts [scripts/generate-readme.ts]
import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'yaml';
import tempo from '@joggr/tempo';

// if you are using CJS remove the following line
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const fileContents = await fs.readFile(
  path.join(__dirname, 'action.yaml'),
  'utf8'
);
const config = yaml.parse(fileContents);

const doc = tempo()
  .h1(config.name)
  .paragraph(config.description)
  .codeBlock(
    `
name: ${config.name}
steps:
  - uses: actions/checkout@v2
  - uses: example@v1
    with:
      ${Object.keys(config.inputs)
        .map(
          (key) => `${key}: ${config.inputs[key].default || 'example'}`
        )
        .join('\n      ')}
    `.trim(),
    'yaml'
  )
  .h2('Inputs')
  .table([
    ['Name', 'Description', 'Default'],
    ...Object.keys(config.inputs).map((key) => [
      key,
      config.inputs[key].description,
      config.inputs[key].default || 'example',
    ]),
  ])
  .h2('Outputs')
  .table([
    ['Name', 'Description'],
    ...Object.keys(config.outputs).map((key) => [
      key,
      config.outputs[key].description,
    ]),
  ]);

await fs.writeFile(
  path.join(__dirname, 'README.md'), 
  doc.toString(), 
  'utf8'
);
```

You are now ready to generate the `README.md` file.

## Generating the README

You can now generate the `README.md` file by running the script. You can then run the script using the executable of your choice, but we recommend using `tsx` to run the script.

```bash
$ tsx scripts/generate-readme.ts
```

> [!TIP]
> Execute the script every time you update the `action.yml` file, either using a pre-commit hook or a GitHub Action.

## Conclusion

You have successfully generated a GitHub Action's `README.md` file using Tempo. You can now customize the script to fit your needs and generate more complex documentation.

You can see a working example or the script in the main [GitHub repository](https://github.com/joggrdocs/tempo/tree/main/examples/gha/generate.ts)