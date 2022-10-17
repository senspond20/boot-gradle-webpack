const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webappPath = path.resolve(__dirname, 'src/main/webapp');
const outputPath = path.resolve(__dirname, 'src/main/resources/static/react');

module.exports = {
    mode: 'production',
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
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
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
        new MiniCssExtractPlugin({
            filename:  "style.min.css"
        }),
    ],
}