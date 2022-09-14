const range = (from, to) =>
  [...Array(to - from + 1).keys()].map(i => i + to - from);

const shuffle = array => {
  const arrayToShuffle = [...array];
  const shuffled = [];
  while (arrayToShuffle.length) {
    const random = Math.floor(Math.random() * arrayToShuffle.length);
    shuffled.push(...arrayToShuffle.splice(random, 1));
  }
  return shuffled;
};

module.exports = { range, shuffle };
