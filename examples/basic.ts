import fs from 'node:fs/promises';
import path from 'node:path';

import doc from '../src/lib/Document';

const result = doc()
  .h1('Hello World')
  .text('This is a paragraph')
  .h2(text => text.text('This is a heading with ').bold('bold text').build())
  .text(text => text.bold('This is bold text').build())
  .text(
    text => `This is inline text ${text.italic('with italic text').build()}`
  )
  .text(text => text.text('Foobar is a thing').bold('that is bold').build())
  .codeBlock('console.log("Hello World")', 'javascript')
  .build();

fs.writeFile(path.join(__dirname, 'basic.md'), result).then(() =>
  console.log('Done!')
);
