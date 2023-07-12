import tempo from '../../src';

function run() {
  return tempo()
    .h1('Table Examples')
    .paragraph('Includes example of tables.')
    .h2('Example Table')
    .table([
      ['Name', 'Age', 'Gender'],
      ['John Doe', '30', 'Male'],
      ['Jane Doe', '25', 'Female'],
      ['Foo Bar', '40', 'Male']
    ])
    .toString();
}

export default run;
