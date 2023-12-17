import { expect, describe, it } from 'vitest';
import { shuffle } from '../../src/utils/arrayUtils';
import { getBrokenUrls } from '../../src/utils/urlUtils';

describe('urlValidation', () => {
  const POSTMAN_ECHO_SERVICE_URL = 'https://postman-echo.com';

  describe('getBrokenUrls', function () {
    it('should collect broken urls', async () => {
      const delayUrls = Array(90).fill(`${POSTMAN_ECHO_SERVICE_URL}/delay/1`);
      const errorUrls = Array(5).fill(`${POSTMAN_ECHO_SERVICE_URL}/status/500`);
      const notFoundUrls = Array(5).fill(
        `${POSTMAN_ECHO_SERVICE_URL}//status/404`,
      );

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
    });

    it('should collect correct errors in case of httpClient failures', async () => {
      const MOCK_HTTP_CLIENT = url => Promise.reject('NETWORK ERROR');

      const brokenUrls = await getBrokenUrls(['url1', 'url2'], {
        httpClient: MOCK_HTTP_CLIENT,
      });

      expect(brokenUrls).to.deep.equal([
        {
          error: 'NETWORK ERROR',
          url: 'url1',
        },
        {
          error: 'NETWORK ERROR',
          url: 'url2',
        },
      ]);
    });
  });
}, 5000);
