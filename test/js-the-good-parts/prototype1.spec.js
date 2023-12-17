import { expect, describe, it } from 'vitest';

const Status = function (status) {
  this.status = status;
};
Status.prototype.getStatus = function () {
  return this.status;
};

const status1 = new Status('PASS');

const status2 = {
  status: 'FAIL',
};

describe('Prototype test', () => {
  it('Test apply and closure', () => {
    console.log(status1.getStatus());
    console.log(status1.getStatus.apply(status2));

    expect(status1.getStatus()).equals('PASS');
    expect(status1.getStatus.apply(status2)).equals('FAIL');
  });
});
