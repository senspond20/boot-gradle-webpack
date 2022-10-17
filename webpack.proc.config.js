const os =require('os')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webappPath = path.resolve(__dirname, 'src/main/webapp');
const outputPath = path.resolve(__dirname, 'src/main/resources/static/vue');


module.exports = {
    mode: 'production',
    entry: {
        app: path.join(webappPath, "client.js"),
        server: path.join(webappPath, "server.js")
    },
    output: {
        path: outputPath,
        filename: '[name].bundle.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions: [".ts", ".tsx", ".js", ".json"],
        fallback : {
            fs: false,
            child_process: false,
            net: false,
            tls: false,
            dns: false,
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',

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
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.min.css"
        })
    ],
}