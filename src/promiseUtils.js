const BluebirdPromise = require('bluebird');
const { validateMandatoryParams } = require('./functionUtils');

const identity = x => x;

const delay = ({ fn = identity, fnArguments = [], duration = 0 }) =>
  new Promise(res => setTimeout(() => res(fn(...fnArguments)), duration));

const timeoutPromise = timeout =>
  new Promise((_res, rej) =>
    setTimeout(() => {
      rej(`${timeout} milliseconds exeeded`);
    }, timeout),
  );

const waitForAll = ({
  targets, // array of data to pass to the toPromiseMapFn
  toPromiseMapFn, // target => Promise
  concurrency = 1,
  timeout = 1000,
} = {}) => {
  validateMandatoryParams([{ targets }, { toPromiseMapFn }]);
  return Promise.race([
    BluebirdPromise.map(targets, toPromiseMapFn, { concurrency }),
    timeoutPromise(timeout),
  ]);
};

(async () => {
  const results = await waitForAll({
    targets: [100, 200, 300],
    toPromiseMapFn: target =>
      delay({ fnArguments: [target], duration: target }),
    timeout: 305,
    concurrency: 3,
  });

  await delay(1000); // validate that timeoutPromise does not throw
  console.log(results);
})();
