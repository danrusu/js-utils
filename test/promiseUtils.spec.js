const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const { delay, waitForAll, waitForPromise } = require('../src/promiseUtils');

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
    const targets = [10, 20, 30];
    const timeout = Math.max(...targets) + 10;
    const toPromiseMapFn = target =>
      delay({ fnArgs: [target], duration: target });

    it('all promisses are fulfilled within the timeout', async () => {
      const results = await waitForAll({
        targets,
        toPromiseMapFn,
        timeout,
        concurrency: 3,
      });

      expect(results).to.deep.equal(targets);
    });
  });
});
