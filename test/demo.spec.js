const { expect } = require('chai');
const { double } = require('../src/demo');

describe('Double test', () => {
  it('Doubles a number', () => {
    expect(double(5)).to.equal(10);
  });

  it('Throws TypeError for a string arg', () => {
    try {
      double('abc');
    } catch (err) {
      expect(err).is.instanceOf(TypeError);
      expect(err.message).to.equal('abc must be a number.');
    }
  });
});
