import { z } from 'zod';
import { expect, it } from 'vitest';

export const toString = (num: unknown) => {
  const number = z.number().parse(num);
  return String(number);
};

// TESTS
it('Should throw a runtime error when called with not a number', () => {
  expect(() => toString('123')).toThrowError(
    'Expected number, received string',
  );
});

it('Should return a string when called with a number', () => {
  expect(toString(1)).toBeTypeOf('string');
});
