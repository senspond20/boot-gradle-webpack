const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env) => {
    const webappPath = path.resolve(__dirname, 'src/main/webapp');
    const publicPath = path.resolve(__dirname, 'src/main/webapp/assets');
    const outputPath = path.resolve(__dirname, 'src/main/resources/static');
    const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

    return {
        mode: mode,
        entry: {
            index: path.join(webappPath, "index.js"),
            css : path.join(webappPath, "style.css")
        },
        output: {
            path: outputPath,
            filename: '[name].bundle.js'
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
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
            ],
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
                    filename: "style.css"
//                filename:  "css/[name].css'
                    // filename: path.join(publicPath, "css/style.css")
                })
            ],
        },

    }

}