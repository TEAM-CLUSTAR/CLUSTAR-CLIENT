module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => /^(Merge|merge|Revert|revert)\s.+/.test(message)],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+): (.+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'scope-empty': [2, 'always'],
    'header-trim': [2, 'always'],
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
