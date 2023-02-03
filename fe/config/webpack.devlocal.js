const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = require("./webpack.common");

const devConfig = {
   mode: "development",
   target: "web",
   devtool: "inline-source-map",
   output: {
      publicPath: "auto",
   },
   devServer: {
      port: 3000,
      historyApiFallback: true,
      hot: true,
   },
   plugins: [
      new MFLiveReloadPlugin({
         port: 3000, // the port your app runs on
         standalone: true, // false uses chrome extention
      }),
      new HtmlWebpackPlugin({
         template: "./public/index.html",
      }),
      new webpack.DefinePlugin({
         "process.env.API_URL": JSON.stringify("http://localhost:5259"),
         // "process.env.ROOT_URL": JSON.stringify("localhost"),
         "process.env.ROOT_URL": JSON.stringify("75.119.131.21"),
         // 'process.env.API_URL': JSON.stringify('https://api.wohhup.com'),
         'process.env.API_NODE_URL': JSON.stringify('https://idd.wohhup.com'),
         'process.env.PUBLIC_URL': JSON.stringify('https://whidd.com'),
      }),
   ]
};

module.exports = merge(commonConfig, devConfig);
