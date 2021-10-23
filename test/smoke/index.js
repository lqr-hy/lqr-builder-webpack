const path = require('path');
const webpack = require('webpack');
// 用于每次测试清除文件
const rimraf = require('rimraf');

const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: '100000',
})

process.chdir(path.join(__dirname, 'template'));

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod')

  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.log(err)
      process.exit(2)
    }
    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false
      })
    )
    mocha.addFile(path.join(__dirname, 'html-test.js'))
    mocha.addFile(path.join(__dirname, 'css-js-test.js'))

    mocha.run()
  })
})
