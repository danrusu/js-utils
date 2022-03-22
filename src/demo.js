module.exports = {
  double(nr) {
    const argType = typeof nr;
    if (argType !== 'number') {
      throw new TypeError(`${nr} must be a number.`);
    }
    return nr * 2;
  },
};
