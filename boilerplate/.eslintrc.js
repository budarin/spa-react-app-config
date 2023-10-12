const config = require('@budarin/spa-react-app-config').getEslintrc();

module.exports = {
    ...config,

    rules: {
        ...config.rules,
    },
};
