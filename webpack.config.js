const path = require('path')

module.exports = (env) => {
    const resourcesPath = path.resolve(__dirname, 'src/main/resources');
    const outputPath = path.resolve(__dirname, 'src/main/resources/static/js');
    const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

    return {
        mode: mode,
        entry: {
            index: path.join(resourcesPath, "index.js")
        },
        output: {
            path: outputPath,
            filename: '[name].bundle.js'
        }
    }

}