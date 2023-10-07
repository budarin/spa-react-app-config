const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (cwd) => {
    return {
        mode: 'production',
        devtool: false,
        entry: './src/sw/index.ts',
        output: {
            path: path.resolve('./dist'),
            filename: 'sw.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.jsm', '.json', '.css', '.mp3', '.svg', '.png', '.gif'],
            modules: ['node_modules', 'src'],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: path.join(cwd, './tsconfig.json'),
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
            ],
        },
    };
};
