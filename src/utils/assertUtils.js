module.exports = () => {
  let assertions = [];

  const isFunction = assertion => assertion instanceof Function;

  const add = (...newAssertions) => {
    assertions = [...assertions, ...newAssertions.filter(isFunction)];
  };

  const assertAll = () => {
    const errors = [];
    assertions.forEach(assertion => {
      try {
        assertion();
      } catch (err) {
        errors.push(err);
      }
    });
    assertions = [];
    if (errors.length > 0) {
      throw new Error(
        `${errors.length} failed assertions\n${errors
          .map(e => e.message)
          .join('\n')}`
      );
    }
  };
  return {
    add,
    assertAll,
  };
};
