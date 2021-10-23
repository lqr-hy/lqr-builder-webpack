
const assets = require('assert')
describe('test webpack base test', () => {
  const baseConfig = require('../../lib/webpack.base')
  it('entry', () => {
    assets.equal(baseConfig.entry.index.indexOf('builder-webpack/test/smoke/template/src/index/index.js') > -1, true);
    assets.equal(baseConfig.entry.search.indexOf('builder-webpack/test/smoke/template/src/search/index.js') > -1, true);
  })
})