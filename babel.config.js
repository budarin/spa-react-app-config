const path = require('path');
const { dependencies } = require(path.resolve(__dirname, './package.json'));
const ErrorOverlayPlugin = require('@webhotelier/webpack-fast-refresh/error-overlay');

const isDev = process.env['NODE_ENV'] !== 'production';

module.exports = {
    comments: true,
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                modules: 'auto',
                debug: isDev,
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
                development: isDev,
            },
        ],
        '@babel/preset-typescript',
    ],
    env: {
        development: {
            plugins: ['react-refresh/babel', new ErrorOverlayPlugin()],
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
