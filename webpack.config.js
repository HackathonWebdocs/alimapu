const webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
        home: './app/public/js/home.js',
        doc: './app/public/js/doc.js'
    },
    output: {
        path: './dist/js',
        filename: '[name].js',
        publicPath: '/js/',
        chunkFilename: '[id].[name].js'
    },
    resolve: {
        modules: ['node_modules', 'modules'],
        descriptionFiles: ['package.json'],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js'
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
            options: {
                presets: [
                    ['es2015', { modules: false }]
                ]
            }
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            filename: 'common.js',
            name: 'common'
        })
    ],
    node: {
        fs: 'empty'
    }
};
