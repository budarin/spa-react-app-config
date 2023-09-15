module.exports = {
    env: {
        browser: true,
        es2024: true,
    },

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],

    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: 'latest',
    },

    plugins: [
        '@typescript-eslint',
        '@babel/eslint-plugin',
        'react',
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

        'import/extensions': ['.ts', '.tsx'],
    },

    overrides: [
        {
            // только для тестов используем плагины для тестов
            files: '**/?(*.)+(spec|test).(js|ts|tsx)',
            extends: ['plugin:jest/all', 'plugin:jest-dom/recommended', 'plugin:testing-library/react'],
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
        // 'import/no-restricted-paths': [
        //     'error',
        //     {
        //         zones: [
        //             {
        //                 target: ['./src/domain/**/*'],
        //                 from: ['./src/!(domain)/**/*'],
        //                 except: ['./src/utils/**/*'],
        //                 message: 'Модули домена не могут импортировать ничего кроме модулей из ./src/utils',
        //             },
        //         ],
        //     },
        // ],
    },

    ignorePatterns: ['/*', '!/src'],
};
