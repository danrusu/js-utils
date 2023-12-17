import { expect, describe, it } from 'vitest';

const quo = function (statusObj) {
  return {
    get_status: function () {
      return statusObj.status;
    },
  };
};

describe.only('closure', () => {
  it('function closes over passed parameter, an object in this case', () => {
    const status = { status: 'amazed' };
    const myQuo = quo(status);

    expect(myQuo.get_status()).to.equal(status.status);

    status.status = 'bored';
    expect(myQuo.get_status()).to.equal('bored');
  });
});
