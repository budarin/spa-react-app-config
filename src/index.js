module.exports = {
    getBabelConfig: require('../babel.config.js'),
    prettierConfig: require('../prettier.config.js'),
    eslintrc: require('../.eslintrc.js'),
    styleLintConfig: require('../stylelint.config.js'),
    jestConfig: require('../jest.config.js'),
    // playwrightConfig: require('./playwright.config.ts'),
    webpackPlugins: require('../webpack/plugins.js'),
    webpackConfigs: {
        getDevConfig: require('../webpack/config.js'),
        getProdConfig: require('../webpack/prod.config.js'),
        getClientConfig: require('../webpack/client.config.js'),
        getClientProdConfig: require('../webpack/client.prod.config.js'),
        getSwConfig: require('../webpack/sw.config.js'),
        getSwProdConfig: require('../webpack/sw.prod.config.js'),
    },
};
