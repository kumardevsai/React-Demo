const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: path.join(__dirname, '../src/main.js')
  },
  output: {
    filename: '[name]-[hash:8].js',
    path: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: path.join(__dirname, '../src'),
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /.(js|jsx)$/,
        include: path.join(__dirname, '../src'),
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugins({
      inject: true,
      filename: 'index.html',
      template: path.join(__dirname, '../index.html')
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running success!`],
      }
    })
  ],
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    compress: true,
    port: 3000,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    quiet: true
  }
}