const { expect } = require('chai');
const { shuffle } = require('../src/arrayUtils');
const { getBrokenUrls } = require('../src/urlValidation');

describe('urlValidation.getBrokenUrls test', function () {
  this.timeout(5000);
  it('should collect broken urls', async () => {
    const delayUrls = Array(90).fill('https://postman-echo.com/delay/1');
    const errorUrls = Array(5).fill('https://postman-echo.com/status/500');
    const notFoundUrls = Array(5).fill('https://postman-echo.com/status/404');

    const urls = shuffle([...delayUrls, ...errorUrls, ...notFoundUrls]);
    const concurrency = 100;

    const brokenUrls = await getBrokenUrls(urls, {
      method: 'HEAD',
      concurrency,
    });

    const brokenUrlsStatuses = brokenUrls
      .map(({ status }) => status)
      .sort((x, y) => x - y);

    const EXPECTED_BROKEN_URLS_STATUSES = [
      ...Array(5).fill(404),
      ...Array(5).fill(500),
    ];
    expect(brokenUrlsStatuses).to.deep.equal(EXPECTED_BROKEN_URLS_STATUSES);

    console.log(JSON.stringify(brokenUrlsStatuses, null, 2));
  });
});
