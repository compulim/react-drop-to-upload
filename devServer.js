'use strict';

const
  devWebpackConfig = require('./webpack.config'),
  webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server');

const webpackServer = new WebpackDevServer(
  webpack(devWebpackConfig),
  devWebpackConfig.devServer
);

webpackServer.listen(devWebpackConfig.__params.PORT);
