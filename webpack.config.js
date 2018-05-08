var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              enforce: 'pre',
              include: [
                path.resolve(__dirname, 'js')
              ],
              loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
          {
            test: /\.svg$/,
            include: [
              path.resolve(__dirname, 'icons')
            ],
            loader: "react-svg-loader",
          },
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};