// TODO: setup eslint for webpack config files
const argv = require('yargs').argv;
const createWebpackConfig = require('./webpack-config-factory');

const debug = !!process.env.DEBUG;
const buildTarget = process.env.TARGET.toLowerCase();
const env = process.env.ENV || 'local';
const isDevServer = argv.$0 === 'webpack-dev-server';

module.exports = createWebpackConfig({
  debug,
  buildTarget,
  env,
  buildOutputDir: 'dist',
  longTermCaching: !debug,
  extractStylesheet: !isDevServer,
  lint: true,
  failOnLinterError: !isDevServer,
  sourceMaps: true,
  devServer: isDevServer && {
    port: 3001,
    host: '0.0.0.0'
  },
  browsers: [
    'last 2 versions'
  ],
  progress: true
});
