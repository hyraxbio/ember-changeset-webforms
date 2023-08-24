module.exports = {
  globals: {
    server: true,
    moment: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['ember', 'ember-es6-class'],

  extends: ['eslint:recommended', 'plugin:ember/recommended'],
  env: {
    browser: true,
  },
  rules: {
    'ember/no-classic-classes': 0,
    'ember/no-actions-hash': 0,
    'ember/no-component-lifecycle-hooks': 0,
    'ember/require-tagless-components': 0,
    'ember/require-computed-property-dependencies': 0,
  },
  overrides: [
    // node files
    {
      files: ['.eslintrc.js', '.template-lintrc.js', 'ember-cli-build.js', 'index.js', 'testem.js', 'blueprints/*/index.js', 'config/**/*.js', 'tests/dummy/config/**/*.js'],
      excludedFiles: ['addon/**', 'addon-test-support/**', 'app/**', 'tests/dummy/app/**'],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      }),
    },
  ],
};
