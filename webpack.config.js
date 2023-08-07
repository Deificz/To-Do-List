const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    Model: './src/Model.js',
    View: './src/View.js',
    Controller: './src/Controller.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
    ],
  },
 
};