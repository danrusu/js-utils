const { expect } = require('chai');
const { deepKeysSort } = require('../../src/utils/objectUtils');

describe('objectUtils', () => {
  describe('deepKeysSort', () => {
    it('should sort nested object keys', () => {
      const sortTarget = {
        c: {
          z: ['c', 'b', 'a'],
          y: [
            { b: 5, a: 4 },
            { d: 7, c: 6 },
          ],
          x: 3,
        },
        a: 1,
        b: 2,
      };
      const expected = {
        a: 1,
        b: 2,
        c: {
          x: 3,
          y: [
            { a: 4, b: 5 },
            { c: 6, d: 7 },
          ],
          z: ['c', 'b', 'a'],
        },
      };
      expect(deepKeysSort(sortTarget)).deep.equals(expected);
    });
  });
});
