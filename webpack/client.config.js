const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const browserslistToEsbuild = require('./browserslist-to-esbuild.js');

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/client/index.ts',
    output: {
        path: path.resolve('./dist'),
        trustedTypes: {
            policyName: 'webpack-tt',
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEBUG__: process.env['DEBUG'] === 'true',
            __DEV__: process.env['NODE_ENV'] !== 'production',
            __PROD__: process.env['NODE_ENV'] === 'production',
            __TEST__: process.env['NODE_ENV'] === 'test',
            __VERSION__: JSON.stringify(process.env.npm_package_version),
        }),
    ],
    resolve: {
        extensions: [
            '.ts',
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
                test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav|ico|xml|woff2)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ts|tsx|js|jsx|json)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'esbuild-loader',
                        options: {
                            // browserslistToEsbuild('>0.2%, not dead')
                            target: browserslistToEsbuild(),
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
