const path = require('path')

module.exports = (env) => {
    const webappPath = path.resolve(__dirname, 'src/main/webapp');
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
        plugins: [

        ]
    }

}