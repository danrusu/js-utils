const { expect } = require('chai');
const { shuffle } = require('../src/random');

describe('random.shuffle test', () => {
  it('shuffles array', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const shuffled = shuffle(numbers);
    const ascending = (x, y) => x - y;

    expect(shuffled).to.not.deep.equal(numbers);
    expect(shuffled.sort(ascending)).to.deep.equal(numbers);
  });
});
