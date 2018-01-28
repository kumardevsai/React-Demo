'use strict';

const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const packFiles = [resolve('src')];

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/main.js')
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules:[
      {
        test: /.(js|jsx)$/,
        include: packFiles,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugins({
      filename: 'index.html',
      template: path.join(__dirname, '../index.html')
    })
  ]
}