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
         "process.env.ROOT_URL": JSON.stringify("localhost"),
      }),
   ]
};

module.exports = merge(commonConfig, devConfig);
