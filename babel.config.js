const path = require('path');
const { dependencies } = require(path.resolve(__dirname, './package.json'));

module.exports = {
    comments: true,
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                modules: 'auto',
                corejs: {
                    version: dependencies['core-js'],
                    proposals: true,
                },
                useBuiltIns: 'entry',
            },
        ],
        [
            '@babel/preset-react',
            {
                runtime: 'automatic',
                development: process.env['NODE_ENV'] !== 'production',
            },
        ],
        '@babel/preset-typescript',
    ],
};
