const logDuration = async (durationName, actionFn, ...actionParams) => {
  console.time(durationName);
  const result = await actionFn(...actionParams);
  console.timeEnd(durationName);
  return result;
};

const toMillis = dateAsString => {
  return new Date(dateAsString).getTime();
};

module.exports = { logDuration, toMillis };
