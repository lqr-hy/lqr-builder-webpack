
// js 压缩
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
// css 压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Cssnano = require('cssnano');
const Merge = require('webpack-merge');

const baseConfig = require('./webpack.base');

const ssrConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        use: 'ignore-loader',
      },
    ],
  },
  plugins: [
    new UglifyjsWebpackPlugin(), // js代码压缩
    new OptimizeCssAssetsPlugin({
      // css代码压缩
      assetNameRegExp: /\.css$/g,
      cssProcessor: Cssnano,
    }),
  ],
  optimization: {
    splitChunks: { // 提取公共包,  当一个公共函数被多次引用的时候就打入公共包
      minSize: 0,
      cacheGroups: {
        commons: {
          names: 'commons',
          chunks: 'all',
          minChunks: 2, // 最小引入次数
        },
      },
    },
  },
};

module.exports = Merge(baseConfig, ssrConfig);
