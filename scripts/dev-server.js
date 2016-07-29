const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfigFactory = require('../webpack/webpack-config-factory.js');
const historyApiFallbackMiddleware = require('connect-history-api-fallback');

// TODO: consider using WebpackDevServer API, not express with middlewares
const app = express();

const buildTarget = process.env.TARGET.toLowerCase();
const env = process.env.TARGET_ENV || 'local';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001;

const webpackConfig = webpackConfigFactory({
  release: false,
  buildTarget,
  env,
  // TODO: change dir depending on build target
  buildOutputDir: 'dist',
  longTermCaching: false,
  extractStylesheet: true,
  lint: true,
  failOnLinterError: false,
  sourceMaps: true,
  inlineSourceMaps: true,
  devServer: {
    port,
    host
  }
});
const compiler = webpack(webpackConfig);

const { historyApiFallback } = webpackConfig.devServer;
if (historyApiFallback) {
  app.use(historyApiFallbackMiddleware(
    typeof historyApiFallback === 'object' ? historyApiFallback : null));
}

app.use(webpackDevMiddleware(compiler, Object.assign({}, webpackConfig.devServer, {
  publicPath: webpackConfig.output.publicPath
})));
app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
  reload: true
}));

app.listen(port, host, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.info(`Webpack client dev-server listening on ${host}:${port}`);
});
