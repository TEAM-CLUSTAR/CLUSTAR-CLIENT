module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'docs', 'chore', 'init', 'perf', 'test'],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
  },
};
