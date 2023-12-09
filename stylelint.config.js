module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
    plugins: ['stylelint-use-logical-spec'],
    rules: {
        'selector-class-pattern': null,
        'custom-property-pattern': null,
        'csstools/use-logical': 'always',
    },
};
