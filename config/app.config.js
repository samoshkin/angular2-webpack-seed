module.exports = function (options) {
  const base = {
    baseUrl: '/'
  };

  const local = {
    baseUrl: '/'
  };

  const develop = {
    baseUrl: '/'
  };

  const test = {
    baseUrl: '/'
  };

  const prod = {
    baseUrl: '/'
  };

  return Object.assign({}, base, {
    local,
    test,
    develop,
    prod
  }[options.env]);
};
