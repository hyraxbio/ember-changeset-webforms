import Component from '@ember/component';
import { computed } from '@ember/object';
import generateEmberValidatingFormField from '../../utils/generate-ember-validating-form-field';
import layout from '../../templates/components/ember-pojo-form/validating-form-field';
import createChangeset from '../../utils/create-changeset';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';
import EmberObject from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',
  emberPojoForms: service(),

  init() {
    this._super(...arguments);
    this.fieldComponentsMap = assign(this.get('emberPojoForms.defaultFieldElementComponents'), this.get('emberPojoForms.customFieldElementComponents'));
    this.templateSettings = assign(EmberObject.create(this.get('formSettings')), EmberObject.create(this.get('formField.templateSettings')));
  },

  didInsertElement: function() {
    //Code below will maintain validation colours when component is re-rendered.
    var formField = this.get('formField');
    if (!this.get('changeset')) {
      this.set('changeset', createChangeset([this.get('formField')], this.get('data'), this.get('customValidators')));
    }
    var changeset = this.get('changeset');
    if (changeset.get(formField.propertyName)) {
      this.send('validateProperty', changeset, formField, 'insert');
    }
  },

  parsedDataTestId: computed('dataTestId', function() {
    return this.get('dataTestId') || this.get('formField.dataTestId') || `validating-field-${this.get('formField.fieldId')}`;
  }),

  typeClass: computed('formField.fieldType', function() {
    var myStr = this.get('formField.fieldType');
    myStr = myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `field-type-${myStr}`;
  }),

  // TODO should a formField not be a class of it's own?
  displayValidation: computed('changeset.error', 'formField.{focussed,wasValidated}', function() {
    var formField = this.get('formField');
    if (!formField) { return; }
    if (!this.validationEventObj(formField.validationEvents, 'keyUp') && formField.get('focussed')) {
      return;
    }
    var validationErrors = (this.get(`changeset.error.${this.get('formField.propertyName')}.validation`)) || [];
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
      return generateEmberValidatingFormField(this.get('fieldSchema'), this.get('fieldComponentsMap'));
    }
  }),

  validates: computed('fieldSchema', function() {
    return (this.get('fieldSchema.validationRules') || []).length > 0;
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
        if (this.get('afterValidation')) {
          this.afterValidation(validationResponse, formField, changeset);
        }
        if (this.get('afterFieldValidation')) {
          this.afterFieldValidation(validationResponse, formField, changeset);
        }
      });
    },

    onUserInteraction: function(formField, value) {
      console.log('onUserInteraction');
      console.log(formField);
      console.log(value);
      this.send('setFieldValue', value, formField);
      this.send('validateProperty', this.get('changeset'), formField);
    },

    onFocusOut: function(formField, value) {
      formField.set('focussed', false);
      if (value && !formField.get('notrim') && formField.get('inputType') !== 'password' && typeof value === 'string') {
        value = value.trim();
      }
      this.send('setFieldValue', value, formField);
      this.send('validateProperty', this.get('changeset'), formField, 'focusOut', event);
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
      this.send('setFieldValue', value, formField);
      this.send('validateProperty', this.get('changeset'), formField, 'keyUp', event);
      if (this.afterKeyUpAction) {
        this.afterKeyUpAction(value, event, formField, this.get('changeset'));
      }
    },

    setFieldValue: function(value, formField) {
      console.log('setFieldValue');
      console.log(value);
      console.log(formField);
      var changeset = this.get('changeset');
      changeset.set(formField.propertyName, value);
      if (this.customTransforms) {
        this.customTransforms(formField.fieldId, changeset, formField); // TODO sort out the mess of these args- no more fieldId.
      }
    }
  },

  validationEventObj(validationEvents, eventType) {
    return validationEvents.find(validationEvent => {
      return validationEvent.event === eventType;
    });
  }
});
