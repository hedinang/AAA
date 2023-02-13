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
        // https: true,
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
            "process.env.ROOT_URL": JSON.stringify("192.168.1.3"),
            'process.env.PUBLIC_KEY': JSON.stringify('BLxQxFrE6dlnKPjD8276HW4KB8C2PsEl93iF5aDnP6Uikdw5pQVTxUNn5LLEr_mtwpVlSHn7LTa_vzcJSot0CXs'),
        }),
    ]
};

module.exports = merge(commonConfig, devConfig);
