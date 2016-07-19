const createWebpackConfig = require('./webpack-config-factory');

const release = !!process.env.RELEASE;
const buildTarget = process.env.TARGET.toLowerCase();

// NOTE: cannot use just ENV, because angular2-hmr works only when ENV contains 'dev'
const env = process.env.TARGET_ENV || 'local';

module.exports = createWebpackConfig({
  release,
  buildTarget,
  env,

  // TODO: calculate correct output dir based on build target
  buildOutputDir: 'dist',
  longTermCaching: release,
  extractStylesheet: true,
  lint: true,
  failOnLinterError: true,
  sourceMaps: true,
  // inline maps are required for Cordova environment due to file:// protocol
  inlineSourceMaps: buildTarget === 'mobile' || !release
});
