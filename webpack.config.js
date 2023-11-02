const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    content: './src/content.ts',
    popup: './src/popup.ts',
    background: './src/background.ts'
  },
  mode: 'production',
  output: {
   filename: '[name].js',
   path: path.resolve(__dirname, 'extension'),
   clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'popup',
      filename: 'popup.html',
      template: 'public/popup.html',
      chunks: ['popup']
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};