module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
    plugins: ['stylelint-use-logical-spec', 'stylelint-plugin-defensive-css'],
    rules: {
        'selector-class-pattern': null,
        'custom-property-pattern': null,
        'liberty/use-logical-spec': 'always',

        // https://defensivecss.dev/
        // https://github.com/yuschick/stylelint-plugin-defensive-css
        // https://github.com/yuschick/stylelint-plugin-defensive-css/issues/34

        'plugin/use-defensive-css': [
            true,
            {
                severity: 'warning',
                'accidental-hover': true,
                'background-repeat': true,
                'custom-property-fallbacks': false,
                'flex-wrapping': true,
                'scroll-chaining': true,
                'scrollbar-gutter': true,
                'vendor-prefix-grouping': true,
            },
        ],
    },
};
