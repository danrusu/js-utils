const { assert } = require('chai');

const { validateMandatoryParams } = require('../src/functionUtils');

describe('functionUtils test', () => {
  describe('validateMandatoryParams test', () => {
    it('should throw for invalid parameter', async () => {
      const test = 'demo';
      const id = 1111;
      let duration;
      assert.throws(
        () => validateMandatoryParams({ name, id, duration }),
        Error,
        'name is not defined',
      );
    });
  });
});
