
const path = require('path');
process.chdir(path.join(__dirname, 'smoke/template'));

describe('builder-webpack base test', () => {
  require('./unit/webpack-base-test')
});