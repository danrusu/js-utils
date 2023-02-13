function deepKeysSort(object) {
  if (typeof object !== 'object') {
    return object;
  }

  let sortedObject = {};
  Object.entries(object).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.find(item => typeof item === 'object')) {
        Object.entries(value).forEach(([index, valueAtIndex]) => {
          value[parseInt(index)] = deepKeysSort(valueAtIndex);
        });
      }
    } else {
      sortedObject = Object.keys(object)
        .sort()
        .reduce((acc, key) => {
          acc[key] = object[key];
          return acc;
        }, {});
      sortedObject[key] = deepKeysSort(value);
    }
  });
  return sortedObject;
}

module.exports = {
  deepKeysSort,
};
