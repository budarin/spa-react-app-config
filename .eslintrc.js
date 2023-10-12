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
        'airbnb',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
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
            extends: [
                'plugin:jest/recommended',
                'plugin:jest-dom/recommended',
                'plugin:testing-library/react',
            ],
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
        indent: 'off',
        camelcase: 'off',
        'max-len': 'off',
        'react/jsx-indent': 'off',
        'object-curly-newline': 'off',
        'implicit-arrow-linebreak': 'off',
        'import/no-mutable-exports': 'off',
        'react/jsx-filename-extension': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        'no-use-before-define': [
            'error',
            {
                functions: true,
                classes: true,
                variables: true,
                allowNamedExports: false,
            },
        ],

        'react/prop-types': 'off',
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
    },

    ignorePatterns: ['*.js', '!./src'],
};
