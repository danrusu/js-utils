const { expect } = require('chai');
const { range, shuffle } = require('../src/arrayUtils');

describe('arrayUtils.shuffle test', () => {
  it('shuffles array', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const ascending = (x, y) => x - y;
    for (let i = 0; i < 100; i++) {
      const shuffled = shuffle(numbers);
      expect(shuffled).to.not.deep.equal(numbers);
      expect(shuffled.sort(ascending)).to.deep.equal(numbers);
    }
  });
});

describe('arrayUtils.range test', () => {
  it('shuffles array', () => {
    const EXPECTED_RANGE = [5, 6, 7, 8, 9, 10];
    expect(range(5, 10)).to.deep.equal(EXPECTED_RANGE);
  });
});
