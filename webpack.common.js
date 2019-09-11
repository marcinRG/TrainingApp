const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let cleanOptions = {
    root: path.join(__dirname, ''),
    verbose: true,
    dry: false
};

const srcPath = './src/';

module.exports = {
    entry: {
        app: path.join(__dirname, srcPath + 'app.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(cleanOptions),
        new SassLintPlugin(),
        new HtmlWebpackPlugin({
            title: 'Training App',
            template: path.join(__dirname, srcPath + 'index.html')
        })
    ],
};
