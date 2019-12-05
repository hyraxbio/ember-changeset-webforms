import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/validating-form-field-clone';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  emberPojoForms: service(),

  cloneErrors: computed('changeset.error', function() {
    var index = this.get('index');
    var validationErrors = ((this.get(`changeset.error.${this.get('masterFormField.fieldId')}.validation`)) || [])[0];
    return validationErrors[index];
  }),

  displayValidation: computed('changeset.error', 'clonedFormField.{focussed,wasValidated}', function() {
    var index = this.get('index');
    var clonedFormField = this.get('clonedFormField');
    if (!clonedFormField) { return; }
    var fieldValidationEvents = clonedFormField.get('validationEvents') || [];
    if (fieldValidationEvents.indexOf('keyUp') < 0 && clonedFormField.get('focussed')) {
      return;
    }
    if (this.get('masterfieldDisplayValidation') === 'valid') { return 'valid'; }
    var validationErrors = ((this.get(`changeset.error.${this.get('masterFormField.fieldId')}.validation`)) || [])[0];
    if (!validationErrors) { return; }
    if (!validationErrors[index]) { return; }
    if (!this.get('clonedFormField.wasValidated')) { return; }
    if (validationErrors[index].length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  actions: {
    onFocusOutClone(index, value) {
      this.onFocusOut(this.updatedGroupValue(value, index));
      this.set('clonedFormField.wasValidated', true);
    },

    onFocusInClone(index, value) {
      this.onFocusIn(this.updatedGroupValue(value, index));
    },
    onKeyUpClone(index, value) {
      this.onKeyUp(this.updatedGroupValue(value, index));
    },

    onUserInteractionClone(index, value) {
      this.onUserInteraction(this.updatedGroupValue(value, index));
    },
  },

  updatedGroupValue(value, index) {
    var groupValue = this.get('groupValue') || [];
    groupValue[index] = value;
    return groupValue;
  }
});
