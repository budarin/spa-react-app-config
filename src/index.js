module.exports = {
    getBabelConfig: () => require('../babel.config.js'),
    getPrettierConfig: () => require('../prettier.config.js'),
    getEslintrc: () => require('../.eslintrc.js'),
    getStyleLintConfig: () => require('../stylelint.config.js'),
    getJestConfig: () => require('../jest.config.js'),
    // playwrightConfig: require('./playwright.config.ts'),
    getWebpackPlugins: () => require('../webpack/plugins.js'),
    webpackConfigs: {
        getDevConfig: () => require('../webpack/config.js'),
        getProdConfig: () => require('../webpack/prod.config.js'),
        getClientConfig: () => require('../webpack/client.config.js'),
        getClientProdConfig: () => require('../webpack/client.prod.config.js'),
        getSwConfig: () => require('../webpack/sw.config.js'),
        getSwProdConfig: () => require('../webpack/sw.prod.config.js'),
    },
};
