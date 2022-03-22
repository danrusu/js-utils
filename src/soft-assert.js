module.exports = () => {
  let toAssert = [];
  const errors = [];

  const assert = (...assertions) => {
    toAssert = [...assertions];
  };

  const assertAll = () => {
    toAssert.forEach(assertion => {
      try {
        assertion();
      } catch (err) {
        errors.push(err);
      }
    });
    if (errors.length > 0) {
      throw new Error(
        `${errors.length} failed assertions\n${errors
          .map(e => e.message)
          .join('\n')}`
      );
    }
  };
  return {
    assert,
    assertAll,
  };
};
