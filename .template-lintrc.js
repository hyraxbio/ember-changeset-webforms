/* eslint-env node */
'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-implicit-this': {
      allow: [
        'ember-changeset-webforms/array-join',
        'ember-changeset-webforms/cloned-form-field-display-value',
        'ember-changeset-webforms/dynamic-class-names',
        'ember-changeset-webforms/moment-format',
        'ember-changeset-webforms/moment',
        'get-with-default',
        'sanitise-classname',
      ],
    },
  },
};
