const { assert, expect } = require('chai');
const { SmartFetch } = require('../../src/http/SmartFetch');

const POSTMAN_ECHO_SERVICE_DELAY_URL = 'https://postman-echo.com/delay';

describe('SmartFetch test', function () {
  this.timeout(10000);
  const smartFetch = new SmartFetch();

  it('should count active/total requests', async () => {
    const first = smartFetch.fetch(`${POSTMAN_ECHO_SERVICE_DELAY_URL}/1`);
    expect(smartFetch.getActive()).equals(1);
    expect(smartFetch.getTotal()).equals(1);
    const second = smartFetch.fetch(`${POSTMAN_ECHO_SERVICE_DELAY_URL}/2`);
    expect(smartFetch.getActive()).equals(2);
    expect(smartFetch.getTotal()).equals(2);
    const third = smartFetch.fetch(`${POSTMAN_ECHO_SERVICE_DELAY_URL}/3`);
    expect(smartFetch.getActive()).equals(3);
    expect(smartFetch.getTotal()).equals(3);

    await first;
    expect(smartFetch.getActive()).equals(2);
    await second;
    expect(smartFetch.getActive()).equals(1);
    await third;
    expect(smartFetch.getActive()).equals(0);

    expect(smartFetch.getTotal()).equals(3);
  });

  it('should collect errors', () => {
    const first = smartFetch.fetch(`${POSTMAN_ECHO_SERVICE_DELAY_URL}/1`);
  });
});
