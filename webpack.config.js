/*eslint-env node*/
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function(env) {
  return {
    mode: 'development',

    entry: {
      app: './index.js',
    },

    output: {
      path: __dirname + '/dist',
      filename: 'index.js',
      publicPath: '/'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
    ],

    bail: true,

    devServer: {
      contentBase: 'public',
      inline: true,
      port: 3000,
    }
  }
}
