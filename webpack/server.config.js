const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
    mode: 'development',
    devtool: false,
    entry: './src/server/index.mts',
    output: {
        path: path.resolve('./dist'),
        filename: 'sw.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: process.env['DEBUG'] === 'true',
            DEV: process.env['NODE_ENV'] !== 'production',
            PROD: process.env['NODE_ENV'] === 'production',
            TEST: process.env['NODE_ENV'] === 'test',
            VERSION: JSON.stringify(process.env.npm_package_version),
        }),
    ],
    resolve: {
        extensions: [
            '.ts',
            '.mts',
            '.tsx',
            '.js',
            '.jsx',
            '.jsm',
            '.json',
            '.css',
            '.png',
            '.svg',
            '.jpg',
            '.jpeg',
            '.gif',
            '.ogg',
            '.mp3',
            '.wav',
            '.ico',
            '.xml',
            '.woff2',
        ],
        modules: ['node_modules', 'src'],
        plugins: [
            // вычисляем путь к конфигу при инициализации webpack.config.js
            new TsconfigPathsPlugin(),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(ts|mts|tsx|js|jsx|json)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'esbuild-loader',
                        options: {
                            target: 'esnext',
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav|ico|xml|woff2)$/i,
                type: 'asset/resource',
            },
        ],
    },
};

module.exports = config;
