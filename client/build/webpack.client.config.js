const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractCSS = new ExtractTextPlugin('css/[name].css');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(base, {
  devtool: '#cheap-module-source-map',
  entry: {
    app: './src/entry-client.js',
    style: './src/assets/css/index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: extractCSS.extract({ use: 'css-loader?sourceMap' })
      },
      {
        test: /\.styl$/,
        loader: extractCSS.extract({ use: 'css-loader?sourceMap!stylus-loader' })
      }
    ]
  },
  plugins: [
    extractCSS,
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          /node_modules/.test(module.context) &&
          !/\.css$/.test(module.request)
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // this is needed in webpack 2 for minifying CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'blog',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/, /\.css$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        }
      ]
    })
  )
}

module.exports = config
