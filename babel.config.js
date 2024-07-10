const path = require('path');
const { dependencies } = require(path.resolve(__dirname, './package.json'));

const isDev = process.env['NODE_ENV'] !== 'production';

module.exports = {
    comments: true,
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                debug: isDev,
                modules: 'auto',
                corejs: {
                    proposals: true,
                    version: dependencies['core-js'],
                },
                useBuiltIns: 'entry',
            },
        ],
        [
            '@babel/preset-react',
            {
                development: isDev,
                runtime: 'automatic',
            },
        ],
        '@babel/preset-typescript',
    ],
    env: {
        development: {
            plugins: [],
        },
        production: {
            plugins: [
                '@babel/plugin-transform-react-constant-elements',
                '@babel/plugin-transform-react-inline-elements',
                ['react-remove-properties', { properties: [/^data-test/] }],
            ],
        },
    },
};
