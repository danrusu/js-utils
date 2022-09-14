const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const shuffle = array => {
  const arrayToShuffle = [...array];
  const shuffled = [];
  while (arrayToShuffle.length) {
    const random = Math.floor(Math.random() * arrayToShuffle.length);
    shuffled.push(...arrayToShuffle.splice(random, 1));
  }
  return shuffled;
};

module.exports = { shuffle };
