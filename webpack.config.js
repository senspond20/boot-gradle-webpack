const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = (env) => {
    const webappPath = path.resolve(__dirname, 'src/main/webapp');
    const publicPath = path.resolve(__dirname, 'src/main/webapp/assets');
    const outputPath = path.resolve(__dirname, 'src/main/resources/static');
    const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

    return {
        mode: mode,
        entry: {
            index: path.join(webappPath, "index.js")
        },
        output: {
            path: outputPath,
            filename: '[name].bundle.js'
        },
        devServer: {
            port : 4000,
            // static:{
            //     directory: path.resolve(__dirname, 'src/main/webapp'),
            //     publicPath : '/assets',
            //     watch : true,
            //     serveIndex: true,
            // }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(webappPath, "index.html")
            })
        ]
    }

}