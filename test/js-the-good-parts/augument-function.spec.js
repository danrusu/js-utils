import { expect, describe, it } from 'vitest';

Function.prototype.addMethod = function (name, func) {
  if (this.prototype[name]) {
    throw new Error(`Cannot add method "${name}". It already exists.`);
  }

  this.prototype[name] = func;
  return this;
};

Number.addMethod('integer', function () {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

describe('Augumented Numbers', () => {
  it('should convert to integer', () => {
    expect((-10 / 3).integer()).to.equal(-3);
  });

  it('adding existing method should throw', () => {
    expect(() => {
      Number.addMethod('integer', function () {
        return Math[this < 0 ? 'ceil' : 'floor'](this);
      });
    }).to.throw(Error, 'Cannot add method "integer". It already exists.');
  });
});
