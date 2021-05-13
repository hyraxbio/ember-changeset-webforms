import Component from '@ember/component';
import { computed } from '@ember/object';
import parseChangesetWebformField from 'ember-changeset-webforms/utils/parse-changeset-webform-field';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/validating-field';
import createChangeset from 'ember-changeset-webforms/utils/create-changeset';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';
import EmberObject from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',
  EmberChangesetWebforms: service(),

  init() {
    this._super(...arguments);
    this.fieldComponentsMap = assign(this.get('EmberChangesetWebforms.defaultFieldElementComponents'), this.get('EmberChangesetWebforms.customFieldElementComponents'));
    this.templateSettings = assign(EmberObject.create(this.get('formSettings')), EmberObject.create(this.get('formField.templateSettings')));
  },

  didInsertElement: function() {
    //Code below will maintain validation colours when component is re-rendered.
    var formField = this.get('formField');
    if (!this.get('changesetProp')) {
      this.set('changesetProp', createChangeset([this.get('formField')], this.get('data'), this.get('customValidators')));
    }
    var changesetProp = this.get('changesetProp');
    if (changesetProp.get(formField.propertyName)) {
      this.send('validateProperty', changesetProp, formField, 'insert');
    }
  },

  dataTestFieldId: computed('dataTestId', 'dataTestFormName', 'formField.dataTestFieldName', function() {
    if (this.get('dataTestId')) { return this.get('dataTestId'); }
    return [this.get('dataTestFormName'), this.get('formField.dataTestFieldName') || this.get('formField.fieldId')].filter(item => item).join('-');
  }),

  typeClass: computed('formField.fieldType', function() {
    var myStr = this.get('formField.fieldType');
    myStr = myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `field-type-${myStr}`;
  }),

  // TODO should a formField not be a class of it's own?
  displayValidation: computed('changesetProp.error', 'formField.{focussed,wasValidated}', function() {
    var formField = this.get('formField');
    if (!formField) { return; }
    if (!this.validationEventObj(formField.validationEvents, 'keyUp') && formField.get('focussed')) {
      return;
    }
    var validationErrors = (this.get(`changesetProp.error.${this.get('formField.propertyName')}.validation`)) || [];
    if (!this.get('formField.wasValidated')) { return; }
    if (validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  formField: computed('fieldSchema', 'processedFieldSchema', 'prop', function() {
    if (this.get('processedFieldSchema')) {
      return this.get('processedFieldSchema');
    } else {
      return parseChangesetWebformField(this.get('fieldSchema'), this.get('fieldComponentsMap'));
    }
  }),

  validates: computed('formField', function() {
    return (this.get('formField.validationRules') || []).length > 0;
  }),

  actions: {
    validateProperty(changeset, formField, eventType, event) {
      if (!formField.validates) { return; }
      if (eventType && !this.validationEventObj(formField.validationEvents, eventType)) {
        return;
      }
      var keyUpValidationMethod = this.validationEventObj(formField.validationEvents, 'keyUp');
      if (eventType === 'keyUp' && keyUpValidationMethod.includeKeyCodes && event) {
        if (keyUpValidationMethod.includeKeyCodes.indexOf(event.keyCode) < 0) {
          return;
        }
        if (keyUpValidationMethod.excludeKeyCodes.indexOf(event.keyCode) > -1) {
          return;
        }
      }  
      changeset.validate(formField.propertyName).then(validationResponse => {
        formField.set('wasValidated', true);
        if (this.afterFieldValidation) {
          this.afterFieldValidation(validationResponse, formField, changeset);
        }
      });
    },

    onUserInteraction: function(formField, value) {
      this.send('setFieldValue', value, formField);
    },

    onChange(formField, value) {
      this.send('setFieldValue', value, formField, 'change');
    },

    onFocusOut: function(formField, value) {
      formField.set('focussed', false);
      if (value && !formField.get('notrim') && formField.get('inputType') !== 'password' && typeof value === 'string') {
        value = value.trim();
      }
      this.send('setFieldValue', value, formField, 'focusOut', event);
      if (this.focusOutAction) {
        this.focusOutAction(formField);
      }
    },

    onFocusIn: function(formField) {
      formField.set('focussed', true);
      if (this.focusInAction) {
        this.focusInAction(formField);
      }
    },

    onKeyUp: function(formField, value, event) {
      this.send('setFieldValue', value, formField, 'keyUp', event);
      if (this.afterKeyUpAction) {
        this.afterKeyUpAction(value, event, formField, this.get('changeset'));
      }
    },

    setFieldValue: function(value, formField, eventType, event) {
      var changeset = this.get('changesetProp');
      if (formField.fieldType === 'input' && eventType === 'keyUp' && event.keyCode === 13) {
        if (this.submitForm) {
          formField.set('focussed', false);
          this.submitForm();
        }
        return;
      }
      formField.set('previousValue', changeset.get(formField.propertyName));
      changeset.set(formField.propertyName, value);
      if (this.afterFieldEdit) {
        this.afterFieldEdit(formField.fieldId, changeset, formField); // TODO sort out the mess of these args- no more fieldId.
      }
      this.send('validateProperty', changeset, formField, eventType, event);
    }
  },

  validationEventObj(validationEvents, eventType) {
    return validationEvents.find(validationEvent => {
      return validationEvent.event === eventType;
    });
  }
});
