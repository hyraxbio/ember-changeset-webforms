import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/validating-form-field-wrapper';

export default Component.extend({
  layout,
  classNames: ['ember-pojo-form-field'],
  classNameBindings: ['displayValidation', 'formField.required:required', 'disabled:disabled', 'readonly:readonly', 'formField.fieldClasses', 'formField.hideSuccessValidation:hide-success-validation', 'validates:validates', 'typeClass', 'formField.focussed:focussed'],
  'data-test-validating-field': true
});
