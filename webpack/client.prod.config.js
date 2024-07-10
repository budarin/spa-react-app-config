const path = require('path');
const webpack = require('webpack');

const { optimizationConfig } = require('./optimizationConfig.js');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

const budarinPackagesPath = path.resolve('./node_modules/@budarin/');

const config = {
    mode: 'production',
    devtool: false,
    entry: './src/client/index.ts',
    cache: {
        type: 'filesystem',
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: '[name].[contenthash][ext]',
        compareBeforeEmit: true,
        // нужно для вызова воркера в коде
        trustedTypes: {
            policyName: 'webpack-tt',
        },
    },
    optimization: optimizationConfig,
    plugins: [
        new webpack.DefinePlugin({
            __DEBUG__: process.env['DEBUG'] === 'true',
            __DEV__: process.env['NODE_ENV'] !== 'production',
            __PROD__: process.env['NODE_ENV'] === 'production',
            __TEST__: process.env['NODE_ENV'] === 'test',
            __VERSION__: JSON.stringify(process.env.npm_package_version),
        }),

        new StatoscopeWebpackPlugin({
            name: 'Client',
            saveTo: path.resolve(`./dist/client-statoscope.html`),
            open: false,
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
                test: /\.(ts|tsx|js|jsx|json)$/,
                exclude: (filePath) => {
                    if (!filePath) {
                        return true;
                    }

                    // включаем в сборку мои пакеты чтобы удалить в них logger.debug
                    if (filePath.startsWith(budarinPackagesPath)) {
                        // console.log('included', filePath)
                        return false;
                    }

                    return /node_modules/.test(filePath);
                },
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
                                        'cssnano',
                                        {
                                            preset: 'default',
                                        },
                                    ],
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
};

module.exports = config;
