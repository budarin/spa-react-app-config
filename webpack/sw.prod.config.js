const path = require('path');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

const budarinPackagesPath = path.resolve('./node_modules/@budarin/');

module.exports = {
    mode: 'production',
    devtool: false,
    entry: './src/providers/sw/index.ts',
    output: {
        path: path.resolve('./dist'),
        filename: 'sw.js',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    compress: true,
                    mangle: true,
                    keep_classnames: false,
                    keep_fnames: false,
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEBUG__: process.env['DEBUG'] === 'true',
            __DEV__: process.env['NODE_ENV'] !== 'production',
            __PROD__: process.env['NODE_ENV'] === 'production',
            __TEST__: process.env['NODE_ENV'] === 'test',
        }),

        new StatoscopeWebpackPlugin({
            name: 'SW',
            saveTo: path.resolve(`./dist/sw-statoscope.html`),
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
                test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav|ico|xml|woff2)$/i,
                type: 'asset/resource',
            },
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
                            cacheDirectory: path.resolve('node_modules/.cache/sw'),
                        },
                    },
                ],
            },
        ],
    },
};
