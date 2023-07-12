import tempo from '../../src';

function run() {
  return tempo()
    .h1('Code Examples')
    .paragraph(txt => txt.text('This includes examples of code blocks and').code('inline code').text('.'))
    .h2(txt => txt.text('This is a heading with ').code('code'))
    .codeBlock(`
import foobar from 'foobar';

function run() {
  console.log("Hello World");
}

export default run;
    `.trim(), 'javascript')
    .toString();
}

export default run;
