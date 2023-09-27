module.exports = {
    root: true,

    env: {
        es2024: true,
        browser: true,
        node: false,
        jest: true,
        'jest/globals': true,
        serviceworker: true,
    },

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:sonarjs/recommended',
    ],

    plugins: ['@typescript-eslint', '@babel'],

    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
            jsx: true,
        },
        project: 'tsconfig.json',
    },

    settings: {
        react: {
            version: 'detect',
        },
        'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
        'import/resolver': {
            typescript: true,
            node: true,
        },
    },

    overrides: [
        {
            // только для тестов используем плагины для тестов
            files: '**/?(*.)+(spec|test).(js|ts|tsx)',
            plugins: ['jest'],
            extends: ['plugin:jest/recommended', 'plugin:jest-dom/recommended', 'plugin:testing-library/react'],
        },
        {
            // enable the rule specifically for TypeScript files
            files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'error',
            },
        },
    ],

    rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
    },

    ignorePatterns: ['*.js', '!./src'],
};
