const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssPluginPx2rem = require('postcss-plugin-px2rem');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css 文件指纹
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 每次构建清除上一次构建产物
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 打包的时候提示错误
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// 多页面打包插件
const glob = require('glob');

// 获取当前目录
const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles).forEach((index) => {
    const entryFile = entryFiles[index];

    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    const htmlConfig = new HtmlWebpackPlugin({
      // 创建在内存中生成的html  插件
      template: path.join(projectRoot, `./src/${pageName}/index.html`), // 指定模板页面路径 ，相当于把指定页面进行渲染
      filename: `${pageName}.html`, // 在浏览器生成页面的名称
      chunks: [pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    });
    htmlWebpackPlugin.push(htmlConfig);
  });

  return {
    entry,
    htmlWebpackPlugin,
  };
};

const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer,
                postcssPluginPx2rem({
                  rootValue: 50, // 设计稿宽度750px时的配置，可以根据设计稿大小调整此数值
                  unitPrecision: 6,
                  minPixelValue: 2, // 小于2px的样式不会被转成rem，因为在部分设备上可能会出现小于1px而渲染失败
                  exclude: /(src\/pages\/pc)/, // web文件px不需要转换成rem
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // css文件指纹,将css单独打包出来
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(), // 每次清除dist目录
    new FriendlyErrorsWebpackPlugin(), // 构建日志提示
    function exitBuild() {
      this.hooks.done.tap('done', (stats) => {
        if (
          stats.compilation.errors
          && stats.compilation.errors.length
          && process.argv.indexOf('--watch') === -1
        ) {
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugin),
  stats: 'errors-only',
};
