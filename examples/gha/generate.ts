import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'yaml';

import tempo from '../../packages/tempo/dist';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const actionFileContents = await fs.readFile(
  path.join(__dirname, 'action.yaml'),
  'utf8'
);
const actionConfig = yaml.parse(actionFileContents);

const doc = tempo()
  .h1(actionConfig.name)
  .paragraph(actionConfig.description)
  .codeBlock(
    `
name: ${actionConfig.name}
steps:
  - uses: actions/checkout@v2
  - uses: example@v1
    with:
      ${Object.keys(actionConfig.inputs)
        .map(
          (key) => `${key}: ${actionConfig.inputs[key].default || 'example'}`
        )
        .join('\n      ')}
    `.trim(),
    'yaml'
  )
  .h2('Inputs')
  .table([
    ['Name', 'Description', 'Default'],
    ...Object.keys(actionConfig.inputs).map((key) => [
      key,
      actionConfig.inputs[key].description,
      actionConfig.inputs[key].default || 'example',
    ]),
  ])
  .h2('Outputs')
  .table([
    ['Name', 'Description'],
    ...Object.keys(actionConfig.outputs).map((key) => [
      key,
      actionConfig.outputs[key].description,
    ]),
  ]);

await fs.writeFile(path.join(__dirname, 'README.md'), doc.toString(), 'utf8');
