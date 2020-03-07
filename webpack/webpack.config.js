/* eslint-disable */
"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const glob = require("glob");

const commonPaths = require("./path");

const config = {
  entry: commonPaths.entry,
  output: {
    path: commonPaths.output
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: "src/public",
        to: "public"
      }
    ]),
    new webpack.HashedModuleIdsPlugin()
  ],
  devServer: {
    contentBase: commonPaths.src,
    inline: true,
    compress: true,
    hot: true
  }
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "eval";
    config.output.filename = "[name].js";
  }

  if (argv.mode === "production") {
    config.devtool = "source-map";
    config.output.filename = `${commonPaths.jsFolder}/[name].[hash].js`;
    config.optimization = {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true
          }
        }
      },
      minimizer: [new TerserPlugin()]
    };
  }

  const files = glob.sync("./src/*.html");
  files.forEach(file => {
    config.plugins.push(
      new HtmlWebPackPlugin({
        filename: path.basename(file),
        template: file,
        minify: argv.mode === "production"
      })
    );
  });

  return config;
};
