const path = require('path');

module.exports = (cwd) => {
    const { dependencies } = require(path.join(__dirname, path.resolve('./package.json')));

    return {
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
};
