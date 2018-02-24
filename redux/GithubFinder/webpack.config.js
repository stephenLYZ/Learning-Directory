
const HTMLWebpackPlugin = require('html-webpack-plugin')

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: `${__dirname}/src/index.html`,
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  module: {
    loaders : [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude : /node_modules/,
      query: {
        "presets": ['es2015','react']
      }
    }]
  },
  devServer: {
    inline: true,
    port: 8080
  },
  plugins: [HTMLWebpackPluginConfig],
}
