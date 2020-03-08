/* eslint-disable */
"use strict";

const webpackMerge = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common");

const build = path.resolve(__dirname, "../", "build");

const config = {
  mode: "development",
  output: {
    filename: "[name].js",
    path: build
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                // enabled: false,
                progressive: true,
                quality: 65
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts",
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: false,
    contentBase: build,
    inline: true,
    compress: true,
    hot: true
  }
};

module.exports = webpackMerge(common, config);
