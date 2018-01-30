const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: path.join(__dirname, '..', 'src')
  },
  output: {
    filename: '[name]-[hash:8].js',
    path: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: path.join(__dirname, '../src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /.scss$/,
        include: path.join(__dirname, '../src'),
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/font/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugins({
      inject: true,
      template: path.join(__dirname, '../index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    clientLogLevel: 'none',
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    open: true
  }
}