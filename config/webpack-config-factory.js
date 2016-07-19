const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const getAppConfig = require('./app.config.js');

const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const DefinePlugin = webpack.DefinePlugin;
const NoErrorsPlugin = webpack.NoErrorsPlugin;
const SourceMapDevToolPlugin = webpack.SourceMapDevToolPlugin;
const NormalModuleReplacementPlugin = webpack.NormalModuleReplacementPlugin;
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const rootDir = path.resolve(__dirname, '..');
const root = relative => path.resolve(rootDir, relative);

const getPreloaders = function* (options) {
  const {
    lint
  } = options;

  // TODO: source-map-loader
  if (lint) {
    yield {
      test: /\.ts$/,
      include: [root('src')],
      loader: 'tslint'
    };
  }
};

const getLoaders = function* (options) {
  const {
    extractStylesheet,
    longTermCaching
  } = options;

  // Typescript files + Angular2 tempaltes
  yield {
    test: /\.ts$/,
    include: [root('src')],
    loaders: [
      'awesome-typescript',
      'angular2-template'
    ],
    exclude: [/\.(spec|e2e)\.ts$/]
  };

  // JSON loader
  yield {
    test: /\.json$/,
    loader: 'json'
  };

  // load application component CSS as text
  // when they are required as styleUrl in Angular component definition
  yield {
    test: /\.css$/,
    include: root('src'),
    exclude: root('src/styles'),
    loader: 'raw!postcss'
  };

  // TODO: enable source maps for CSS
  // load application and 3rd party global CSS
  yield {
    test: /\.css$/,
    include: [
      root('src/styles'),
      [/node_modules/]
    ],
    loader: extractStylesheet
      ? ExtractTextPlugin.extract('style', 'css!postcss')
      : 'style!css!postcss'
  };

  // load application SCSS as text
  // when they are required as styleUrl in Angular component definition
  yield {
    test: /\.scss$/,
    include: root('src'),
    exclude: root('src/styles'),
    loader: 'raw!postcss!sass'
  };

  // load application and 3rd party global SCSS
  yield {
    test: /\.scss$/,
    include: [
      root('src/styles'),
      [/node_modules/]
    ],
    loader: extractStylesheet
      ? ExtractTextPlugin.extract('style', 'css!postcss!sass')
      : 'style!css!postcss!sass'
  };

  // support for .html as raw text
  yield {
    test: /\.html$/,
    loader: 'html',
    exclude: [root('src/index.html')]
  };

  // load images, when below 8KB, use data URIs, otherwise files
  yield {
    test: /\.(png|jpe?g|gif|svg)$/i,
    loader: `url?limit=8192&name=images/[name]${longTermCaching ? '.[hash]' : ''}.[ext]`
  };

  // fonts
  yield {
    test: /\.(woff2|woff|otf|ttf)(\?.*)?$/,
    loader: `file?name=fonts/[name]${longTermCaching ? '.[hash]' : ''}.[ext]`
  };
};

const getPlugins = function* (options, appConfig) {
  const {
    extractStylesheet,
    env,
    buildTarget,
    devServer,
    sourceMaps,
    inlineSourceMaps,
    release,
    optimize
  } = options;

  yield new ForkCheckerPlugin();

  yield new CopyWebpackPlugin([{
    from: 'src/assets/static',
    to: 'static'
  }]);

  yield new CommonsChunkPlugin({
    name: ['vendor', 'polyfills']
  });

  yield new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(release ? 'production' : 'development'),
      TARGET_ENV: JSON.stringify(env),
      RELEASE: release,
      BUILD_TARGET: JSON.stringify(buildTarget),
      DEV_SERVER: !!devServer
    },
    app: {
      config: JSON.stringify(appConfig)
    }
  });

  yield new OccurenceOrderPlugin(true);

  yield new HtmlWebpackPlugin({
    baseUrl: appConfig.baseUrl,
    title: 'Angular2 Webpack Seed',
    template: 'src/index.html',
    chunksSortMode: 'dependency'
  });

  if (devServer) {
    yield new HotModuleReplacementPlugin();
    yield new NoErrorsPlugin();
  }

  if (!devServer) {
    yield new NormalModuleReplacementPlugin(
      /angular2-hmr/,
      root('config/angular2-hmr-fake.js'));
  }

  if (release) {
    yield new DedupePlugin();

    // TODO: or include for all builds
    yield new WebpackMd5Hash();
  }

  if (extractStylesheet) {
    yield new ExtractTextPlugin(`[name].css${options.longTermCaching ? '?[contenthash]' : ''}`);
  }

  if (optimize) {
    yield new UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        // do not mangle GeneratorFunction
        // so is-generator could correctly work
        except: ['GeneratorFunction']
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    });
  }

  if (sourceMaps) {
    // NOTE: eval source maps are faster to generate and rebuild,
    // but breakpoints do not hit on page load

    // in debug: 'cheap-module-source-map', but exclude vendor and common chunks
    // in release: 'source-map', so it works in tandem with UglifyJSPlugin
    // see https://github.com/webpack/webpack/blob/c10432384413fbe2bc9a46f1a762d5c73ed5d950/lib/WebpackOptionsApply.js#L170-L199
    yield new SourceMapDevToolPlugin({
      filename: inlineSourceMaps ? null : '[file].map',
      exclude: [/vendor/, /polyfills/],
      columns: release,
      module: true
    });
  }
};

const getDevMiddlewareClient = function* (options) {
  if (options.devServer) {
    yield 'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr';
  }
};

module.exports = options => {
  const {
    release,
    buildOutputDir,
    buildTarget,
    longTermCaching,
    failOnLinterError,
    devServer
  } = options;

  const appConfig = getAppConfig(options);
  const publicPath = '/';

  return {
    debug: !release,
    cache: !!devServer,
    target: {
      web: 'web',
      mobile: 'web',
      desktop: 'electron'
    }[buildTarget],

    entry: {
      polyfills: `./src/polyfills.${options.buildTarget}.ts`,
      vendor: './src/vendor.ts',
      main: [
        ...getDevMiddlewareClient(options),
        './src/main.ts'
      ]
    },

    output: {
      path: root(buildOutputDir),
      publicPath,
      filename: longTermCaching
        ? 'js/[name].[chunkhash].js'
        : 'js/[name].js',
      chunkFilename: longTermCaching
        ? 'js/[id].[chunkhash].js'
        : 'js/[id].js',
      sourceMapFilename: longTermCaching
        ? 'js/[name].[chunkhash].map'
        : 'js/[name].map',
      pathinfo: !release
    },

    resolve: {
      root: root('src'),
      extensions: ['', '.ts', '.js', '.json'],
      moduleDirectories: ['node_modules']
    },

    module: {
      noParse: [
        /zone\.js\/dist\//,
        /\.min\.js/
      ],
      loaders: [...getLoaders(options)],
      preLoaders: [...getPreloaders(options)]
    },

    plugins: [...getPlugins(options, appConfig)],

    devServer: devServer && {
      publicPath,
      port: devServer.port,
      host: devServer.host,
      historyApiFallback: true,
      lazy: false,
      quiet: false,
      noInfo: false,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      stats: {
        hash: true,
        version: true,
        timings: true,
        assets: true,
        chunks: false,
        chunkModules: false,
        modules: false,
        cached: true,
        reasons: false,
        source: false,
        errorDetails: true,
        chunkOrigins: false,
        colors: true,
        children: false
      }
    },

    tslint: {
      failOnHint: failOnLinterError,
      emitErrors: failOnLinterError,
      formatter: 'stylish',
      formattersDirectory: 'node_modules/tslint-stylish'
    },

    // TODO: clean up and minify CSS for relase builds
    postcss: () => [
      autoprefixer({
        remove: false,
        browsers: [
          'last 2 versions'
        ]
      })
    ]
  };
};
