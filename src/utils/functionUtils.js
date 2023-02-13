// params = { name:  'test', isDemo: true }
const validateMandatoryParams = params =>
  Object.entries(params).forEach(([paramName, paramValue]) => {
    if (paramValue === undefined) {
      throw new Error(`Mandatory param missing: ${paramName}`);
    }
  });

module.exports = { validateMandatoryParams };
