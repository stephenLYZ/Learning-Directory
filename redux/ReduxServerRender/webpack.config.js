import webpack from 'webpack';

module.exports = {
  entry: [
    './client/index.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'react-hmre'],
      },
    }],
  },
}
