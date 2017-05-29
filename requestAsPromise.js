const request = require('request');

module.exports = (opts, errorHandler) => new Promise((resolve, reject) => {
  console.log('API Request', opts.url, opts.body || {});
  request(opts, (error, response, body) => {
    if (error) {
      reject(error.toString());
    } else if (response && response.statusCode && !response.statusCode.toString().startsWith('2')) {
      if (errorHandler) {
        resolve(errorHandler(response));
      } else {
        reject(new Error(`API request ${opts.url} failed with status ${response.statusCode}`));
      }
    } else {
      resolve(body);
    }
  });
});
