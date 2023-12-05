module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
  rules: {
    // your rules
    "at-rule-no-unknown": [ true, {
      ignoreAtRules: ['extend', 'at-root', 'debug', 'warn', 'error', 'if', 'else', 'for', 'each', 'while', 'mixin', 'include', 'content', 'return', 'function']
    }]
  },
};