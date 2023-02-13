const utilsModules = [
  'arrayUtils',
  'functionUtils',
  'objectUtils',
  'promiseUtils',
  'softAssert',
  'timeUtils',
  'urlUtils',
];

module.exports = utilsModules.reduce((exports, utilsModule) => {
  exports[utilsModule] = require(`./src/utils/${utilsModule}`);
  return exports;
}, {});
