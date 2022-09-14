const range = (from, to) =>
  [...Array(to - from + 1).keys()].map(i => i + to - from);

const shuffle = array => {
  const arrayToShuffle = [...array];
  return range(0, arrayToShuffle.length - 1).reduce((acc, _i) => {
    const random = Math.floor(Math.random() * arrayToShuffle.length);
    acc.push(...arrayToShuffle.splice(random, 1));
    return acc;
  }, []);
};

module.exports = { range, shuffle };
