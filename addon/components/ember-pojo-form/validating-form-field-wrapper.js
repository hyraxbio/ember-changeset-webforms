import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/validating-form-field-wrapper';

export default Component.extend({
  layout,
  classNames: ['ember-pojo-form-field'],
  classNameBindings: ['displayValidation', 'formField.required:required', 'disabled:disabled', 'readonly:readonly', 'formField.fieldClass', 'formField.hideSuccessValidation:hide-success-validation', 'validates:validates', 'typeClass', 'formField.focussed:focussed'],
  attributeBindings: ['parsedDataTestId:data-test-id', 'data-test-validation-field', 'dataTestClass:data-test-class'],
});
