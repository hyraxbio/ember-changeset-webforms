import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/validating-field-wrapper';
import { computed } from '@ember/object';
import dynamicClassNames from 'ember-changeset-webforms/utils/dynamic-class-names';

export default Component.extend({
  tagName: "",
  layout,

  'dataTestId': computed('dataTestFieldId', function() {
    if (!this.dataTestFieldId) { return; }
    return `${this.dataTestFieldId}-field`;
  }),

  'dataTestClass': computed('typeClass', function() {
    if (!this.typeClass) { return; }
    return `cwf-${this.typeClass}`;
  }),

  fieldWrapperClassNames: computed('changesetWebform', 'formField.validationStatus', function() {
    return dynamicClassNames('fieldWrapper', this.changesetWebform, this.formField);
  }),

  requiredClasses: computed('formField.required', function() {
    return this.formField.required ? dynamicClassNames('requiredField', this.changesetWebform, this.formField) : '';
  }),

  disabledClasses: computed('formField.disabled', function() {
    return this.formField.disabled ? dynamicClassNames('disabledField', this.changesetWebform, this.formField) : '';
  }),

  validatesClasses: computed('formField.validates', function() {
    return this.formField.validates ? dynamicClassNames('fieldValidates', this.changesetWebform, this.formField) : '';
  }),

  wasValidatedClasses: computed('formField.wasValidated', function() {
    return this.formField.wasValidated ? dynamicClassNames('validatedField', this.changesetWebform, this.formField) : '';
  }),

  focussedClasses: computed('formField.focussed', function() {
    return this.formField.focussed ? dynamicClassNames('focussedField', this.changesetWebform, this.formField) : '';
  })
});
