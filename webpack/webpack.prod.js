/* eslint-disable */
"use strict";

const path = require("path");
const webpackMerge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const common = require("./webpack.common");

const config = {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "../", "build")
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name].[hash].[ext]"
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
              name: "[name].[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          name: "vendor"
        }
      }
    },
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({}),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css"
    })
  ]
};

module.exports = webpackMerge(common, config);
