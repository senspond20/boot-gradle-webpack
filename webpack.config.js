const path = require('path')
// import os from "os"
// import path from "path"
// import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import HtmlWebpackPlugin from "html-webpack-plugin";
// const __dirname = path.resolve();
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webappPath = path.resolve(__dirname, 'src/main/webapp');
const outputPath = path.resolve(__dirname, 'src/main/resources/static/vue');
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const webpackConfig = {
    mode: mode,
    entry: {
        index: path.join(webappPath, "index.js"),
    },
    output: {
        path: outputPath,
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        fallback : {
            fs: false,
            child_process: false,
            net: false,
            tls: false,
            dns: false,
        }
    },
    devServer: {
        port : 3000,
        // static:{
        //     directory: path.resolve(__dirname, 'src/main/webapp'),
        //     publicPath : '/assets',
        //     watch : true,
        //     serveIndex: true,
        // }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ]
    },
    optimization: {
        minimize : true,
        minimizer: [
            new CssMinimizerPlugin(),'...' // '...' 기본값
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(webappPath, "index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "style.min.css"
        })
    ],
}

module.exports = webpackConfig;
// export default webpackConfig;