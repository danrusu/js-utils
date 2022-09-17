const BluebirdPromise = require('bluebird');
const { validateMandatoryParams } = require('./functionUtils');

const identity = x => x;

const delay = ({ fn = identity, fnArgs = [], duration = 0 }) =>
  new Promise(res => setTimeout(() => res(fn(...fnArgs)), duration));

const timeoutPromise = timeout =>
  new Promise((_res, rej) =>
    setTimeout(() => {
      rej(new Error(`${timeout} milliseconds exeeded`));
    }, timeout),
  );

const waitForPromise = (promise, timeout) => {
  validateMandatoryParams({ promise, timeout });
  return Promise.race([promise, timeoutPromise(timeout)]);
};

const waitForAll = ({
  targets, // array of data to pass to the toPromiseMapFn
  toPromiseMapFn, // target => Promise
  concurrency = 1,
  timeout = 1000,
} = {}) => {
  validateMandatoryParams({ targets, toPromiseMapFn });
  return waitForPromise(
    BluebirdPromise.map(targets, toPromiseMapFn, { concurrency }),
    timeout,
  );
};

module.exports = { identity, delay, waitForPromise, waitForAll };
