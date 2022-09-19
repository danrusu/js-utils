const { assert } = require('chai');

const { validateMandatoryParams } = require('../src/functionUtils');

describe('functionUtils', () => {
  describe('validateMandatoryParams', () => {
    it('should throw for invalid parameter', async () => {
      const test = 'demo';
      const id = 1111;
      let duration;
      assert.throws(
        () => validateMandatoryParams({ test, id, duration }),
        Error,
        'Mandatory param missing: duration',
      );
    });
  });
});
