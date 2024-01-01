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

    plugins: ['@typescript-eslint', '@babel', 'boundaries'],

    extends: [
        'airbnb',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:jsx-a11y/recommended',
        'plugin:sonarjs/recommended',
        'plugin:boundaries/strict',
    ],

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
            typescript: {
                alwaysTryTypes: true,
            },
            node: true,
        },
    },

    overrides: [
        {
            // только для тестов используем плагины для тестов
            files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
            env: {
                node: true,
                jest: true,
            },
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
        {
            files: ['**/*.js', '!src/**/*'],
            env: {
                node: true,
            },
        },
    ],

    rules: {
        indent: 'off',
        camelcase: 'off',
        'max-len': 'off',
        'operator-linebreak': 'off',
        'object-curly-newline': 'off',
        'function-paren-newline': 'off',
        'implicit-arrow-linebreak': 'off',

        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-filename-extension': 'off',
        'react/require-default-props': [
            'error',
            {
                ignoreFunctionalComponents: false,
            },
        ],
        'react/prop-types': 'off',

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

        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        '@typescript-eslint/explicit-function-return-type': 'off',

        // Note: you must disable the base rule as it can report incorrect errors
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                varsIgnorePattern: '^_',
            },
        ],

        'no-restricted-syntax': [
            'error',
            {
                selector: 'LabeledStatement',
                message:
                    'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message:
                    '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],

        'import/no-mutable-exports': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                packageDir: ['./', './node_modules/@budarin/spa-react-app-config'],
            },
        ],
    },

    ignorePatterns: ['*.js', '!./src'],
};
