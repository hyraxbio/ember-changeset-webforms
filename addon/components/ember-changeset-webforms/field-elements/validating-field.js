import Component from '@ember/component';
import { computed } from '@ember/object';
import parseChangesetWebformField from 'ember-changeset-webforms/utils/parse-changeset-webform-field';
import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/validating-field';
import createChangeset from 'ember-changeset-webforms/utils/create-changeset';

export default Component.extend({
  layout,
  tagName: '',

  didInsertElement: function () {
    //Code below will maintain validation colours when component is re-rendered.
    var formField = this.formField;
    if (!this.changesetProp) {
      this.set('changesetProp', createChangeset([this.formField], this.data, this.customValidators));
    }
    var changesetProp = this.changesetProp;
    if (changesetProp.get(formField.propertyName)) {
      formField.eventLog.pushObject('insert');
      this.send('validateProperty', changesetProp, formField);
    }
  },

  dataTestFieldId: computed('dataTestId', 'dataTestFormName', 'formField.dataTestFieldName', function () {
    if (this.dataTestId) { return this.dataTestId; }
    return [this.dataTestFormName, this.formField.dataTestFieldName || this.formField.fieldId].filter(item => item).join('-');
  }),

  typeClass: computed('formField.fieldType', function () {
    var myStr = this.formField.fieldType;
    myStr = myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `field-type-${myStr}`;
  }),

  // TODO should a formField not be a class of it's own?
  displayValidation: computed('changesetProp.error', 'formField.{focussed,eventLog.[]}', function () {
    var formField = this.formField;
    if (!formField) { return; }
    if (!formField.validates) { return; }
    if (!this.validationEventObj(formField.validationEvents, 'keyUp') && formField.get('focussed')) {
      return;
    }
    if (!validationEventLog(formField).length) { return }
    var validationErrors = (this.get(`changesetProp.error.${this.formField.propertyName}.validation`)) || [];
    if (validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  formField: computed('fieldSchema', 'processedFieldSchema', 'prop', function () {
    if (this.processedFieldSchema) {
      return this.processedFieldSchema;
    } else {
      return parseChangesetWebformField(this.fieldSchema, this.fieldComponentsMap);
    }
  }),

  actions: {
    validateProperty(changeset, formField) {
      if (!formField.validates) { return; }
      if (!validationEventLog(formField).length) { return }

      // var keyUpValidationMethod = this.validationEventObj(formField.validationEvents, 'keyUp');
      // if (eventType === 'keyUp' && keyUpValidationMethod.includeKeyCodes && event) {
      //   if (keyUpValidationMethod.includeKeyCodes.indexOf(event.keyCode) < 0) {
      //     return;
      //   }
      //   if (keyUpValidationMethod.excludeKeyCodes.indexOf(event.keyCode) > -1) {
      //     return;
      //   }
      // }
      changeset.validate(formField.propertyName).then(() => {
        const fieldValidationErrors = changeset.error[formField.propertyName];
        this.afterFieldValidation(formField, changeset, fieldValidationErrors);
      });
    },

    onChange(formField, value) {
      formField.eventLog.push('change');
      this.send('setFieldValue', value, formField);
    },

    onUserInteraction(formField, eventType, value, event) {
      formField.eventLog.push(eventType);
      if (eventType === 'keyUp') {
        if (formField.fieldType === 'input' && event.keyCode === 13) {
          if (this.submitForm) {
            formField.set('focussed', false);
            this.submitForm(this.changesetProp);
          }
          return;
        }
        this.send('setFieldValue', value, formField);
      } else if (eventType === 'focusOut') {
        formField.set('focussed', false);
        formField.eventLog.push('focusOut');
        if (value && formField.trim && formField.inputType !== 'password' && typeof value === 'string') {
          value = value.trim();
        }
        this.send('setFieldValue', value, formField);
      } else if (eventType === 'focusIn') {
        formField.set('focussed', true);
      }  
      this.onUserInteraction(formField, eventType, value, event)
    },

    onUserInteractionClone(...args) {
      this.onUserInteraction([args]);
    },

    setFieldValue: function (value, formField) {
      var changeset = this.changesetProp;
      formField.set('previousValue', changeset.get(formField.propertyName));
      changeset.set(formField.propertyName, value);
      if (this.afterFieldEdit) {
        this.afterFieldEdit(formField, this.changesetProp);
      }
      this.send('validateProperty', changeset, formField);
    }
  },

  validationEventObj(validationEvents, eventType) {
    return validationEvents.find(validationEvent => {
      return validationEvent.event === eventType;
    });
  }
});
