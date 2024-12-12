import tempo from '../../packages/tempo/src';

function run() {
  return tempo()
    .h1('Code Examples')
    .paragraph((txt) =>
      txt
        .plainText('This includes examples of code blocks and')
        .code('inline code')
        .plainText('.')
    )
    .h2((txt) => txt.plainText('This is a heading with ').code('code'))
    .codeBlock(
      `
import foobar from 'foobar';

function run() {
  console.log("Hello World");
}

export default run;
    `.trim(),
      'javascript'
    )
    .toString();
}

export default run;
