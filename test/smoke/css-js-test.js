const glob = require('glob-all');

describe('test dist generated html files', () => {
  it('should generated css js', (done) => {
    const files = glob.sync(['./dist/index_*.js', './dist/search_*.js', './dist/*_*.css'])
    if (files.length > 0) {
      done()
    } else {
      throw new Error('no html files generated')
    }
  });
});
