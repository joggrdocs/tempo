import fs from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

import exampleBasic from './inputs/basic';
import exampleCode from './inputs/code';
import exampleFrontmatter from './inputs/frontmatter';
import exampleTable from './inputs/table';

/*
|----------------------------------
| Examples
|----------------------------------
|
| Builds the example markdown files that demonstrate the usage of the Tempo.
|
| To run this file, run the following command:
|   `npm run generate:examples`
|
*/

(() => {
  console.log('Building examples...');

  const basicResult = exampleBasic();
  const codeResult = exampleCode();
  const tableResult = exampleTable();
  const frontmatterResult = exampleFrontmatter();

  const examplesDir = path.join(__dirname, '..', 'examples', 'outputs');
  const basicFile = path.join(examplesDir, 'basic.md');
  const codeFile = path.join(examplesDir, 'code.md');
  const tableFile = path.join(examplesDir, 'table.md');
  const frontmatterFile = path.join(examplesDir, 'frontmatter.md');

  Promise.all([
    fs.writeFile(basicFile, basicResult),
    fs.writeFile(codeFile, codeResult),
    fs.writeFile(tableFile, tableResult),
    fs.writeFile(frontmatterFile, frontmatterResult),
  ]);

  console.log('Examples built successfully.');
})();
