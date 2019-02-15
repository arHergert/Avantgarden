const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ip = require("ip");

//Verzeichnise
const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    entry: ["@babel/polyfill", SRC_DIR + '/index.js'],
    output: {
        path: OUTPUT_DIR,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{loader: 'babel-loader'}],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                //loader:[ 'style-loader', 'css-loader' ]
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
      alias: {
          "@resources": path.resolve(__dirname, "src/resources/"),
          "@img": path.resolve(__dirname, "src/resources/img/"),
          "@api": path.resolve(__dirname, "src/backend/")
      },
    },
    devServer: {
      historyApiFallback: true,
      host: ip.address(), //Hier wird IP Adresse des PCs angeben, von dem aus gestartet wird
      port: 8080
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: "./src/favicon.ico"
        })

    ]
};