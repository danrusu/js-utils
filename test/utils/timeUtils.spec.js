import { expect, describe, it } from 'vitest';
const { logDuration } = require('../../src/utils/timeUtils');

describe('logDuration', function () {
  const POSTMAN_ECHO_SERVICE_DELAY_URL = 'https://postman-echo.com/delay';

  async function getInfo(returnValue) {
    await fetch(`${POSTMAN_ECHO_SERVICE_DELAY_URL}/1`);
    await fetch(`${POSTMAN_ECHO_SERVICE_DELAY_URL}/2`);
    return returnValue;
  }

  it('should log duration and return the action return value', async () => {
    const result = await logDuration('getInfo', getInfo, 100);
    expect(result).equals(100);
  }, 5000);
});
