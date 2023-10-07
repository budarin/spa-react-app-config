const path = require('path');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (cwd) => {
    return {
        mode: 'production',
        devtool: false,
        entry: './src/index.tsx',
        cache: {
            type: 'filesystem',
        },
        output: {
            path: path.resolve('./dist'),
            filename: '[name].[contenthash].js',
            compareBeforeEmit: true,
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
            concatenateModules: true,
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: process.env['NODE_ENV'] !== 'production',
                __PROD__: process.env['NODE_ENV'] === 'production',
                __TEST__: process.env['NODE_ENV'] === 'test',
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
                '.mp3',
                '.svg',
                '.png',
                '.gif',
                '.ico',
                '.xml',
                '.woff2',
            ],
            modules: ['node_modules', 'src'],
            plugins: [
                new TsconfigPathsPlugin({
                    // вычисляем путь к конфигу при инициализации webpack.config.js
                    configFile: path.resolve('./tsconfig.json'),
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js|jsx|json)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: path.resolve('node_modules/.cache/client'),
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
                                postcssOptions: {
                                    plugins: [
                                        [
                                            'postcss-preset-env',
                                            {
                                                // browsers: 'last 2 versions',
                                            },
                                        ],
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
    };
};
