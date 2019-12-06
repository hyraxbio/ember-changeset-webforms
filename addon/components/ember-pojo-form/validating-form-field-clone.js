import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/validating-form-field-clone';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  emberPojoForms: service(),

  didInsertElement: function() {
    //Code below will maintain validation colours when component is re-rendered.
    var index = this.get('index');
    var masterFormField = this.get('masterFormField');
    var clonedFormField = this.get('clonedFormField');
    var changeset = this.get('changeset');
    if (changeset.get(masterFormField.fieldId)) {
      this.validateProperty(changeset, clonedFormField, 'insert');
    }
  },

  cloneErrors: computed('changeset.error', function() {
    // console.log('cloneErrors');
    var index = this.get('index');
    var validationErrors = ((this.get(`changeset.error.${this.get('masterFormField.fieldId')}.validation`)) || [])[0];
    // console.log(validationErrors[index]);
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
    onFocusOutClone(index, formField, value) {
      this.onFocusOut(formField, this.updatedGroupValue(value, index));
    },

    onFocusInClone(index, formField) {
      this.onFocusIn(formField);
    },
    
    onKeyUpClone(index, formField, value, event) {
      this.onKeyUp(formField, this.updatedGroupValue(value, index), event);
    },

    onUserInteractionClone(index, formField, value) {
      this.onUserInteraction(formField, this.updatedGroupValue(value, index));
    },
  },

  updatedGroupValue(value, index) {
    var groupValue = this.get('groupValue') || [];
    groupValue[index] = value;
    return groupValue;
  }
});
