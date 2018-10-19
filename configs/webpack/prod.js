// production config
const merge = require('webpack-merge');
const {resolve} = require('path');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './prod-index.tsx',
  output: {
    filename: 'js/video-checker.min.js', //js/bundle.[hash].min.js
    // filename: 'js/screens-management.min.js', //js/bundle.[hash].min.js
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  devtool: 'source-map',
  plugins: [],
});
