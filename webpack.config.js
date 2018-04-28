const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isDevMode = process.env.NODE_ENV === 'development';

const config = {
  entry: {
    app: './src/main.ts',
    vendor: ['reflect-metadata', 'inversify']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDevMode ? '[name].bundle.js' : '[name].[hash].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@core': path.resolve(__dirname, 'src/core/')
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.scss$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new MiniCssExtractPlugin({
      filename: isDevMode ? '[name].css': '[name].[hash].css',
      chunkFilename: isDevMode ? '[id].css': '[id].[hash].css',
    }),
    new CleanWebpackPlugin(['dist'])
  ]
};

module.exports = config; 