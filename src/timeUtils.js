const duration = async (durationName, actionFn, ...actionParams) => {
  console.time(durationName);
  const result = await actionFn(...actionParams);
  console.timeEnd(durationName);
  return result;
};

module.exports = { duration };
