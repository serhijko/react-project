const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
        './src/index.js'
    ],
    output: {
        publicPath: 'http://localhost:3000',
        path: path.resolve(__dirname, '/public'),
        filename: 'bundle.js'
    },
    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : false,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCSSExtractPlugin('bundle.css'),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        modules: ['node_modules', 'bower_components'],
        mainFields: ['*', 'index'],
        extensions: ['.', '.js'],
        // root: __dirname + '/src'
    },
    resolveLoader: {
        modules: ['node_modules', 'bower_components'],
        mainFields: ['*-loader', '*'],
        extensions: ['.', '.js']
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        contentBase: __dirname + '/public',
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loaders: ['react-hot', 'babel-loader'],
                    options: {
                        presets: ['@babel/presets-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                },
                include: [
                    path.resolve(__dirname, 'src')
                ]
            },
            {
                test: /\.css$/i,
                use: [MiniCSSExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file?name=img/[path][name].[ext]'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
            }
        ]
    }
};

if (NODE_ENV === 'production') {
    console.log('WTF');
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:       false,
                drop_console:   true,
                unsafe:         true
            }
        })
    );
}
