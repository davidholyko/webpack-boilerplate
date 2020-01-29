const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 1993;

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss'],
    alias: {},
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
      favicon: path.resolve('./public/favicon.ico'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: 'bundle.js',
    // usually path is in /build
    // static is for gh-pages specfically
    path: path.join(__dirname, 'static'),
    publicPath: '/',
  },
  devServer: {
    // usually path is in /build
    // static is for gh-pages specfically
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    port: port,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
