import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/validating-form-field-wrapper';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['ember-pojo-form-field'],
  classNameBindings: ['displayValidation', 'formField.required:required', 'disabled:disabled', 'readonly:readonly', 'formField.fieldClasses', 'formField.hideSuccessValidation:hide-success-validation', 'validates:validates', 'typeClass', 'formField.focussed:focussed'],
  'data-test-ember-pojo-form-field': true,

  'data-test-ember-pojo-validating-field': computed('validates', function() {
    return this.get('validates');
  }),

  'data-test-ember-pojo-required-field': computed('formField.required', function() {
    return this.get('formField.required');
  }),

  'data-test-id': computed('dataTestFieldId', function() {
    return `${this.get('dataTestFieldId')}-field`;
  }),

});
