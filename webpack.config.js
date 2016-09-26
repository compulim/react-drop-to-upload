'use strict';

const path = require('path');
const qs = require('qs');
const webpack = require('webpack');

const BUILD_ROOT = __dirname;
const PORT = 8080;

const
  BABEL_OPTIONS = {
    presets: ['es2015', 'react'],
    plugins: ['react-hot-loader/babel']
  };

module.exports = {
  __params: { PORT },
  devServer: {
    contentBase: path.join(BUILD_ROOT, 'examples'),
    hot: true,
    publicPath: '/',
    stats: {
      colors: true
    }
  },
  devtool: 'source-map',
  entry: [
    `webpack-dev-server/client?http://0.0.0.0:${ PORT }`,
    'webpack/hot/only-dev-server',
    path.join(BUILD_ROOT, 'examples/index.js')
  ],
  output: {
    devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: 'file:///[absolute-resource-path]?[hash]',
    filename: 'bundle.js',
    path: path.resolve(BUILD_ROOT, 'dist-examples/'),
    pathinfo: true,
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel?' + qs.stringify(BABEL_OPTIONS, { arrayFormat: 'brackets', encode: false })
        ]
      }
    ]
  }
};
