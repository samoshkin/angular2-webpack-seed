// see issue with original to-string-loader package
// Not working with url() or @import statements in stylesheets · Issue #2 · gajus/to-string-loader - https://github.com/gajus/to-string-loader/issues/2
const loaderUtils = require('loader-utils');

module.exports = function () {};
module.exports.pitch = function (remainingRequest) {
  if (this.cacheable) this.cacheable();

  return 'module.exports = require('
    + loaderUtils.stringifyRequest(this, '!!' + remainingRequest)
    + ').toString();';
};
