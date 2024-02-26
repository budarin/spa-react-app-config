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

        'plugin/use-defensive-css': [true, { 'accidental-hover': true }],
        'plugin/use-defensive-css': [true, { 'background-repeat': true }],
        'plugin/use-defensive-css': [true, { 'custom-property-fallbacks': true }],
        'plugin/use-defensive-css': [
            true,
            { 'custom-property-fallbacks': [true, { ignore: [/hel-/, 'theme-'] }] },
        ],
        'plugin/use-defensive-css': [true, { 'flex-wrapping': true }],
        'plugin/use-defensive-css': [true, { 'scroll-chaining': true }],
        'plugin/use-defensive-css': [true, { 'scrollbar-gutter': true }],
        'plugin/use-defensive-css': [true, { 'vendor-prefix-grouping': true }],
    },
};
