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
    var formField = this.get('formField');
    if (!this.get('changesetProp')) {
      this.set('changesetProp', createChangeset([this.get('formField')], this.get('data'), this.get('customValidators')));
    }
    var changesetProp = this.get('changesetProp');
    if (changesetProp.get(formField.propertyName)) {
      formField.eventLog.pushObject('insert');
      this.send('validateProperty', changesetProp, formField);
    }
  },

  dataTestFieldId: computed('dataTestId', 'dataTestFormName', 'formField.dataTestFieldName', function () {
    if (this.get('dataTestId')) { return this.get('dataTestId'); }
    return [this.get('dataTestFormName'), this.get('formField.dataTestFieldName') || this.get('formField.fieldId')].filter(item => item).join('-');
  }),

  typeClass: computed('formField.fieldType', function () {
    var myStr = this.get('formField.fieldType');
    myStr = myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `field-type-${myStr}`;
  }),

  // TODO should a formField not be a class of it's own?
  displayValidation: computed('changesetProp.error', 'formField.{focussed,eventLog.[]}', function () {
    var formField = this.get('formField');
    if (!formField) { return; }
    if (!this.validationEventObj(formField.validationEvents, 'keyUp') && formField.get('focussed')) {
      return;
    }
    if (!validationEventLog(formField).length) { return }
    var validationErrors = (this.get(`changesetProp.error.${this.get('formField.propertyName')}.validation`)) || [];
    if (validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  formField: computed('fieldSchema', 'processedFieldSchema', 'prop', function () {
    if (this.get('processedFieldSchema')) {
      return this.get('processedFieldSchema');
    } else {
      return parseChangesetWebformField(this.get('fieldSchema'), this.get('fieldComponentsMap'));
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

    onClick(formField) {
      formField.eventLog.push('click');
      if (this.onClickAction) {
        this.onClickAction(formField, this.get('changesetProp'));
      }
    },

    onChange(formField, value) {
      formField.eventLog.push('change');
      this.send('setFieldValue', value, formField);
    },

    onFocusOut: function (formField, value) {
      formField.set('focussed', false);
      formField.eventLog.push('focusOut');
      if (value && formField.trim && formField.inputType !== 'password' && typeof value === 'string') {
        value = value.trim();
      }
      this.send('setFieldValue', value, formField);
      if (this.focusOutAction) {
        this.focusOutAction(formField, this.get('changesetProp'));
      }
    },

    onFocusIn: function (formField) {
      formField.set('focussed', true);
      formField.eventLog.push('focusIn');
      if (this.focusInAction) {
        this.focusInAction(formField, this.get('changesetProp'));
      }
    },

    onKeyUp: function (formField, value, event) {
      if (formField.fieldType === 'input' && event.keyCode === 13) {
        if (this.submitForm) {
          formField.set('focussed', false);
          this.submitForm(this.get('changesetProp'));
        }
        return;
      }
      this.send('setFieldValue', value, formField);
      formField.eventLog.push('keyUp');
      if (this.afterKeyUpAction) {
        this.afterKeyUpAction(formField, this.get('changesetProp'), value, event);
      }
    },

    setFieldValue: function (value, formField) {
      var changeset = this.get('changesetProp');
      formField.set('previousValue', changeset.get(formField.propertyName));
      changeset.set(formField.propertyName, value);
      if (this.afterFieldEdit) {
        this.afterFieldEdit(formField, this.get('changesetProp'));
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
