import { expect, describe, it } from 'vitest';
const { SmartFetch } = require('../../src/http/SmartFetch');

const POSTMAN_ECHO_SERVICE_DELAY_URL = 'https://postman-echo.com/delay';
const delayUrl = delay => `${POSTMAN_ECHO_SERVICE_DELAY_URL}/${delay}`;

describe('SmartFetch test', function () {
  const smartFetch = new SmartFetch();

  it('should count active/total requests', async () => {
    const first = smartFetch.fetch(delayUrl(1));
    expect(smartFetch.getActive()).equals(1);
    expect(smartFetch.getTotal()).equals(1);
    const second = smartFetch.fetch(delayUrl(2));
    expect(smartFetch.getActive()).equals(2);
    expect(smartFetch.getTotal()).equals(2);
    const third = smartFetch.fetch(delayUrl(3));
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

  it.todo('should collect errors', () => {
    //const first = smartFetch.fetch(`${POSTMAN_ECHO_SERVICE_DELAY_URL}/1`);
  });
}, 10000);
