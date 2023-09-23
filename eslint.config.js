module.exports = {
    root: true,
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],

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
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:sonarjs/recommended',
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
    ],

    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
            jsx: true,
        },
    },

    plugins: [
        '@typescript-eslint',
        'react',
        '@babel',
        'import',
        'jsx-a11y',
        'optimize-regex',
        'jest',
        'jest-dom',
        'testing-library',
        // должен быть последним!
        'prettier',
    ],

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
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
    },

    ignorePatterns: ['/*', '!/src'],
};
