/* eslint-disable */
"use strict";

const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/js/index.js",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new PreloadWebpackPlugin({
      excludeHtmlNames: ["header.html"],
      include: "initial",
      as(entry) {
        // if (/\.css$/.test(entry)) return 'style';
        // if (/\.woff$/.test(entry)) return 'font';
        // if (/\.png$/.test(entry)) return 'image';
        return "script";
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: "src/public"
      }
    ]),
    new webpack.HashedModuleIdsPlugin()
  ]
};

const files = glob.sync("./src/*.html");
files.forEach(file => {
  config.plugins.push(
    new HtmlWebPackPlugin({
      filename: path.basename(file),
      template: file,
      inject: true,
      favicon: path.resolve(__dirname, "../", "src/public/favicon.ico"),
      minify: process.env.NODE_ENV === "production"
    })
  );
});

module.exports = config;
