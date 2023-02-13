const { expect } = require('chai');

const { logDuration } = require('../src/timeUtils');

describe('logDuration', function () {
  this.timeout(5000);
  const POSTMAN_ECHO_SERVICE_DELAY_URL = 'https://postman-echo.com/delay';

  async function getInfo(returnValue) {
    await fetch(`${POSTMAN_ECHO_SERVICE_DELAY_URL}/1`);
    await fetch(`${POSTMAN_ECHO_SERVICE_DELAY_URL}/2`);
    return returnValue;
  }

  it('should log duration and return the action return value', async () => {
    const result = await logDuration('getInfo', getInfo, 100);
    expect(result).equals(100);
  });
});
