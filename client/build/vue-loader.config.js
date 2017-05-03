var utils = require('./utils')
var path = require('path')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ],
  loaders: utils.cssLoaders({
    sourceMap: isProduction,
    extract: isProduction
  }),
  alias: {
    '~': '!!url-loader?name=[name].[ext]'
  }
}
