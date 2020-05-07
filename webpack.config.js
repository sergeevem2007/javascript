const path = require('path');

module.exports = {
  entery: {
    main: '.src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/dist'
  }
};