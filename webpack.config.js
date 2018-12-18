const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//Verzeichnise
const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    entry: SRC_DIR + '/index.js',
    output: {
        path: OUTPUT_DIR,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{loader: 'babel-loader'}]
            },
            {
                test: /\.css$/,
                loader:[ 'style-loader', 'css-loader' ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })

    ]
};