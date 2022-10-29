module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  customSyntax: 'postcss-scss',
  rules: {
    'function-no-unknown': null,
    'at-rule-no-unknown': null,
    // kebab-case
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
    indentation: 2,
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: ['composes'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
}
