const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  output: {
   filename: 'content.js',
   path: path.resolve(__dirname, 'public'),
   clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
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