var path = require('path');

module.exports = {
  outputDir: process.env.NODE_ENV === 'production' ? '../build/' : 'dist',
  /* assetsDir is relative to output dir */
  assetsDir: process.env.NODE_ENV === 'production' ? '../build/assets/' : '',
  publicPath: '/',
}
