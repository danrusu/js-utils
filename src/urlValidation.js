//http://bluebirdjs.com/docs/getting-started.html
const Promise = require('bluebird');
const fetch = require('node-fetch');

const getBrokenUrls = async (urls, concurrency) =>
  Promise.map(urls, url => fetch(url, { method: 'HEAD' }), {
    concurrency,
  })
    .filter(({ status }) => status !== 200)
    .map(({ url, status, statusText }) => ({ url, status, statusText }));

module.exports = { getBrokenUrls };
