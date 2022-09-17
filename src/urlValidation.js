//http://bluebirdjs.com/docs/getting-started.html
const Promise = require('bluebird');
const fetch = require('node-fetch');

const getBrokenUrls = async (
  urls,
  {
    method = 'GET',
    headers,
    body,
    concurrency = 1,
    isBrokenFn = response => response?.status !== 200,
    httpClient = fetch,
  },
) =>
  Promise.map(
    urls,
    async url => {
      try {
        return await httpClient(url, { method, headers, body });
      } catch (error) {
        return { url, error };
      }
    },
    {
      concurrency,
    },
  )
    .filter(isBrokenFn)
    .map(response => {
      const processedResponse = {
        url: response.url,
      };
      if (response?.error) {
        processedResponse.error = response.error;
      }
      if (response?.status) {
        processedResponse.status = response?.status;
      }
      if (response.statusText) {
        processedResponse.statusText = response?.statusText;
      }
      return processedResponse;
    });

module.exports = { getBrokenUrls };
