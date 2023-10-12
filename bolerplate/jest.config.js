const config = require('@budarin/spa-react-app-config').getJestConfig();

module.exports = {
    ...config,

    moduleNameMapper: {
        '^core(.*)': '<rootDir>/src/core/$1',
        '^contracts(.*)': '<rootDir>/src/core/contracts/$1',
        '^application(.*)': '<rootDir>/src/core/application/$1',
        '^domain(.*)': '<rootDir>/src/core/domain/$1',
        '^store(.*)': '<rootDir>/src/core/domain/store/$1',
        '^services(.*)': '<rootDir>/src/services/$1',
        '^ui(.*)': '<rootDir>/src/ui/$1',
        '^utils(.*)': '<rootDir>/src/utils/$1',
    },
};
