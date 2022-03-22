const { expect } = require('chai');
const soft = require('../src/soft-assert')();

const EXPECTED_ASSERTION_ERROR = [
  '3 failed assertions',
  'numbers check: expected 1 to equal 2',
  'array check: expected [ 1, 2, 3 ] to include 4',
  'boolean check: expected true to be false',
].join('\n');

describe('Soft assert test', () => {
  it('Throws relevant error', () => {
    try {
      soft.assert(
        () => expect(1, 'numbers check').to.equal(2),
        () => expect(1).to.equal(1),
        'this is not an assertion',
        () => expect([1, 2, 3], 'array check').to.include(4),
        () => expect(true, 'boolean check').to.be.false,
        () => expect(true).to.be.true
      );
      soft.assertAll();
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.equal(EXPECTED_ASSERTION_ERROR);
    }
  });
});
