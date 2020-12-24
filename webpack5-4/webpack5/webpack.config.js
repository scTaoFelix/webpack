const { join } = require('path')
let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
 
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg)$/i,
        type: 'asset'
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: join(__dirname, 'dist'),
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // },
    hot: true,
    quiet: true, // FriendlyErrorsPlugin
    port: 9001
  },
  experiments: {
    // importAsync: true,
    // importAwait: true,
    topLevelAwait: true
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,
     
      // add formatters and transformers (see below)
      additionalFormatters: [],
      additionalTransformers: []
    })
  ]
}