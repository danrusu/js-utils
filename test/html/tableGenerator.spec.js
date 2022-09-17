const { expect } = require('chai');
const { table } = require('../../src/html/tableGenerator');

describe('tableGenerator test (similar to console.table)', () => {
  it('Should return html table from an array like [...{...key: primitiveValue}]', () => {
    const FAMILY_ARRAY = [
      { name: 'dan', age: 40, employed: true },
      { name: 'tania', age: 9 },
    ];

    const EXPECTED_HTML = [
      '<table id="array" class="family">',
      '<tr><th>(index)</th><th>age</th><th>employed</th><th>name</th></tr>',
      '<tr><td>0</td><td>40</td><td>true</td><td>dan</td></tr>',
      '<tr><td>1</td><td>9</td><td></td><td>tania</td></tr>',
      '</table>',
    ].join('\n');

    expect(table(FAMILY_ARRAY, { id: 'array', class: 'family' })).to.equal(
      EXPECTED_HTML,
    );
  });
  it('Should return html table from an object like {...key1: {...key11: primitiveValue11 }}', () => {
    const FAMILY_OBJECT = {
      father: { name: 'dan', age: 40, employed: true },
      daughter: { name: 'tania', age: 9 },
    };

    const EXPECTED_HTML = [
      '<table id="object" class="family">',
      '<tr><th>(index)</th><th>age</th><th>employed</th><th>name</th></tr>',
      '<tr><td>father</td><td>40</td><td>true</td><td>dan</td></tr>',
      '<tr><td>daughter</td><td>9</td><td></td><td>tania</td></tr>',
      '</table>',
    ].join('\n');

    expect(table(FAMILY_OBJECT, { id: 'object', class: 'family' })).to.equal(
      EXPECTED_HTML,
    );
  });
});
