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
  },
) =>
  Promise.map(
    urls,
    url => {
      try {
        return fetch(url, { method, headers, body });
      } catch (error) {
        return { error: error.message };
      }
    },
    {
      concurrency,
    },
  )
    .filter(isBrokenFn)
    .map(response => {
      const processedResponse = {
        url: response?.url,
        status: response?.status,
        statusText: response?.statusText,
      };
      if (response?.error) {
        processedResponse.error = response.error;
      }
      return processedResponse;
    });

module.exports = { getBrokenUrls };
