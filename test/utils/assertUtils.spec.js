import { expect, assert, describe, it } from 'vitest';
const softAssert = require('../../src/utils/assertUtils')();

describe('softAssert', () => {
  it('collects and throws relevant error', () => {
    const EXPECTED_ASSERTION_ERROR = [
      '3 failed assertions',
      'numbers check: expected 1 to equal 2',
      'array check: expected [ 1, 2, 3 ] to include 4',
      'boolean check: expected true to be false',
    ].join('\n');
    assert.throws(
      () => {
        softAssert.add(
          () => expect(1, 'numbers check').to.equal(2),
          () => expect(1).to.equal(1),
          'this is not an assertion',
          () => expect([1, 2, 3], 'array check').to.include(4),
        );
        softAssert.add(
          () => expect(true, 'boolean check').to.be.false,
          () => expect(true).to.be.true,
        );
        softAssert.assertAll();
      },
      Error,
      EXPECTED_ASSERTION_ERROR,
    );
  });

  it('does not throw if no assertion fails', () => {
    assert.doesNotThrow(() => {
      softAssert.add(
        () => expect(1.5, 'numbers check').to.equal(1.5),
        () => expect(1).to.equal(1),
        () => expect([1, 2, 3], 'array check').to.include(2),
        () => expect(undefined).to.be.undefined,
        () => expect(true).to.be.true,
      );
      softAssert.assertAll();
    });
  });
});
