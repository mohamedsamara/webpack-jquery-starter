/* eslint-disable */
"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new PreloadWebpackPlugin({
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

    config.module.rules.push({
      test: /\.(scss|sass|css)$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    });
  }

  if (argv.mode === "production") {
    config.devtool = "source-map";
    config.output.filename = `${commonPaths.jsFolder}/[name].[hash].js`;

    config.module.rules.push({
      test: /\.(scss|sass|css)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: true
          }
        },
        "css-loader",
        "sass-loader"
      ]
    });

    config.optimization = {
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
      minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
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
