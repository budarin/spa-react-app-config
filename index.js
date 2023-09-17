module.exports = {
    babelConfig: require('./babel.config.js'),
    prettierConfig: require('./prettier.config.js'),
    eslintrc: require('./.eslintrc.js'),
    styleLintConfig: require('./stylelint.config.js'),
    jestConfig: require('./jest.config.js'),
    // playwrightConfig: require('./playwright.config.ts'),
    webpackPlugins: require('./webpack/plugins.js'),
    webpackConfigs: {
        dev: require('./webpack/config.js'),
        prod: require('./webpack/prod.config.js'),
        client: require('./webpack/client.config.js'),
        clientProd: require('./webpack/client.prod.config.js'),
        sw: require('./webpack/sw.config.js'),
        swProd: require('./webpack/sw.prod.config.js'),
    },
};
