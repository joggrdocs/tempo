import tempo from '../../packages/tempo/src';

function run() {
  return tempo()
    .frontmatter({
      title: 'Frontmatter Example',
      description: 'This is an example of frontmatter',
      tags: ['example', 'frontmatter'],
      published: true,
      version: 1,
    })
    .h1('Hello World')
    .paragraph('This is a paragraph')
    .h2((text) => text.plainText('This is a heading with ').bold('bold text'))
    .paragraph((text) => text.bold('This is bold text'))
    .paragraph(
      (text) => `This is inline text ${text.italic('with italic text')}`
    )
    .paragraph((text) =>
      text.plainText('Foobar is a thing').bold('that is bold')
    )
    .h2('Lists')
    .alert('This is an alert', 'caution')
    .paragraph('This is a list')
    .bulletList(['Item 1', 'Item 2', 'Item 3'])
    .paragraph('This is a numbered list')
    .numberList(['Item 1', 'Item 2', 'Item 3'])
    .toString();
}

export default run;
