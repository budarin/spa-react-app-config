const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const browserslistToEsbuild = require('./browserslist-to-esbuild.js');

const esbuildTarget = browserslistToEsbuild();
console.log('esbuild target:', browserslistToEsbuild());
console.log('\n');

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/client/index.mts',
    output: {
        path: path.resolve('./dist'),
        trustedTypes: {
            policyName: 'webpack-tt',
        },
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
                            target: esbuildTarget,
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env',
                                    [
                                        'postcss-pixels-to-rem',
                                        {
                                            base: 16,
                                            unit: 'rem',
                                            exclude: [],
                                            mediaQueries: true,
                                        },
                                    ],
                                ],
                            },
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

    devServer: {
        port: 3000,
        client: {
            overlay: false,
        },
        static: {
            publicPath: '/dist',
            directory: './dist',
        },
        hot: true,
        open: false,
        compress: true,
        historyApiFallback: true,
    },
};

module.exports = config;
