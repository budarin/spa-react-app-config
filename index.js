module.exports = {
    babelConfig: require('./babel.config.js'),
    prettierrc: require('./.prettierrc.js'),
    eslintrc: require('./.eslintrc.js'),
    styleLintConfig: require('./stylelint.config.js'),
    jestConfig: require('./jest.config.js'),
    // playwrightConfig: require('./playwright.config.ts'),
    webpackConfigs: {
        dev: require('./webpack/webpack.config.js'),
        prod: require('./webpack/prod.webpack.config.js'),
        client: require('./webpack/client.webpack.config.js'),
        clientProd: require('./webpack/client.prod.webpack.config.js'),
        sw: require('./webpack/sw.webpack.config.js'),
        swProd: require('./webpack/sw.prod.webpack.config.js'),
    },
};
