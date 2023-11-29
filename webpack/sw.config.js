const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const srcPath = path.resolve('./src');

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/services/sw/index.ts',
    output: {
        path: path.resolve('./dist'),
        filename: 'sw.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEBUG__: process.env['DEBUG'] === 'true',
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
                        return false;
                    }

                    if (
                        filePath.includes('/node_modules/@budarin/') ||
                        filePath.startsWith(srcPath)
                    ) {
                        // console.log('include', filePath);
                        return false;
                    }

                    return true;
                },
                use: [
                    {
                        loader: 'esbuild-loader',
                        options: {
                            target: 'esnext',
                        },
                    },
                ],
            },
        ],
    },
};
