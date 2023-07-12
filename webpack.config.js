const path = require('path');
// eslint-disable-next-line import/no-unresolved
const slsw = require('serverless-webpack');
const webpack = require('webpack');

module.exports = {
    entry: slsw.lib.entries,
    target: 'async-node',
    mode: 'production',
    externals: [{
        'aws-sdk': 'commonjs aws-sdk',
    }],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{loader: 'babel-loader'}],
            },
            {
                test: /\.ejs$/i,
                use: [{loader: 'raw-loader'}],
            },
        ],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/knex\/lib\/dialects/, /mysql\/index.js/),
    ],
    optimization: {
        minimize: false,
    },
    devtool: 'cheap-module-source-map',
};
