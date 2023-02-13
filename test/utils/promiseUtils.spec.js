const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const {
  delay,
  mapRejectToErrorObject,
  waitForAll,
  waitForPromise,
} = require('../../src/utils/promiseUtils');

describe('promiseUtils', () => {
  describe('waitForPromise', () => {
    it('should work if promise is fulfilled within the timeout', async () => {
      const result = await waitForPromise(
        delay({ fnArgs: [1111], duration: 10 }),
        20,
      );
      await expect(result).to.equal(1111);
    });

    it('should throw if promise is not fulfilled within the timeout', async () => {
      await expect(
        waitForPromise(delay({ fnArgs: [1111], duration: 10 }), 5),
      ).to.be.rejectedWith('5 milliseconds exeeded');
    });
  });

  describe('waitForAll test', () => {
    const targets = [10, 20, 30, 20, 10];
    const timeout = Math.max(...targets) + 20;
    const toPromiseMapFn = target =>
      delay({ fnArgs: [target], duration: target });

    it('all promisses are fulfilled within the timeout', async () => {
      const results = await waitForAll({
        targets,
        toPromiseMapFn,
        timeout,
        concurrency: 5,
      });

      expect(results).to.deep.equal(targets);
    });
  });

  describe('mapRejectToErrorObject', () => {
    it('map rejected promisses to { details, error: error.message } objects', async () => {
      const fulfill = result => Promise.resolve(result);
      const reject = errorMessage => Promise.reject(new Error(errorMessage));
      const error = 'test error';
      const errorDetails = 'error details';

      const promises = [
        ...Array(3).fill(0).map(fulfill),
        ...Array(3).fill(error).map(reject),
      ];

      const mappedPromises = [
        ...promises.map(mapRejectToErrorObject()),
        ...[error].map(reject).map(mapRejectToErrorObject({ errorDetails })),
      ];

      const EXPECTED_RESULTS = [
        ...Array(3).fill(0),
        ...Array(3).fill({ error }),
        { errorDetails, error },
      ];

      const results = await Promise.all(mappedPromises);

      expect(results).to.deep.equal(EXPECTED_RESULTS);
    });
  });
});
