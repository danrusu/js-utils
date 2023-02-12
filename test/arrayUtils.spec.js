const { expect } = require('chai');
const { range, shuffle, unique } = require('../src/arrayUtils');

describe('arrayUtils', () => {
  describe('shuffle test', () => {
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

  describe('range test', () => {
    it('generates range of integers', () => {
      const EXPECTED_RANGE = [5, 6, 7, 8, 9, 10];
      expect(range(5, 10)).to.deep.equal(EXPECTED_RANGE);
    });
  });

  describe('unique test', () => {
    it('should remove duplicates objects by equalFn', () => {
      const results = [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
      ];

      const equalFn = o1 => o2 => o1.id == o2.id;

      const EXPECTED_UNIQUE_RESULTS = [{ id: 1 }, { id: 2 }];

      const uniqueResults = unique(results, equalFn);
      expect(uniqueResults).deep.equal(EXPECTED_UNIQUE_RESULTS);
    });

    it('should remove duplicates for numbers array', () => {
      const results = [1, 1, 2, 2, 1, 2, 1, 2, 3];

      const EXPECTED_UNIQUE_RESULTS = [1, 2, 3];

      const uniqueResults = unique(results);
      expect(uniqueResults).deep.equal(EXPECTED_UNIQUE_RESULTS);
    });

    it('should remove duplicates for strings array', () => {
      const results = ['one', 'one', 'two', 'one', 'two'];

      const EXPECTED_UNIQUE_RESULTS = ['one', 'two'];

      const uniqueResults = unique(results);
      expect(uniqueResults).deep.equal(EXPECTED_UNIQUE_RESULTS);
    });
  });
});
