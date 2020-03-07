/* eslint-disable */

"use strict";

const path = require("path");

module.exports = {
  root: path.resolve(__dirname, "../"),
  src: path.resolve(__dirname, "../", "src"),
  output: path.resolve(__dirname, "../", "build"),
  entry: path.resolve(__dirname, "../", "src/js/index.js"),
  template: path.resolve(__dirname, "../", "src/index.html"),
  favicon: path.resolve(__dirname, "../", "src/public/favicon.ico"),
  images: path.resolve(__dirname, "../", "src/images"),
  imagesFolder: "images",
  fontsFolder: "fonts",
  cssFolder: "css",
  jsFolder: "js"
};
