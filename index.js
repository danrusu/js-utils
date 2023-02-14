const utilsModules = [
  'arrayUtils',
  'functionUtils',
  'objectUtils',
  'promiseUtils',
  'assertUtils',
  'timeUtils',
  'urlUtils',
];

module.exports = utilsModules.reduce((exports, utilsModule) => {
  exports[utilsModule] = require(`./src/utils/${utilsModule}`);
  return exports;
}, {});
