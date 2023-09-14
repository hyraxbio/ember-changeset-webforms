import { action } from '@ember/object';
import Component from '@glimmer/component';
// import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';

export default class ValidatingField extends Component {
  get dataTestFieldId() {
    if (this.dataTestId) {
      return this.dataTestId;
    }
    return [
      this.args.dataTestFormName,
      this.args.formField.dataTestFieldName || this.args.formField.fieldId,
    ]
      .filter((item) => item)
      .join('-');
  }

  get typeClass() {
    var myStr = this.args.formField.fieldType;
    myStr = myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `field-type-${myStr}`;
  }

  get labelId() {
    return `${this.args.formField.name}-label`;
  }

  get ariaLabelledBy() {
    if (!this.args.formField.hideLabel) {
      return this.labelId;
    }
    return null;
  }

  get ariaLabel() {
    return this.args.formField.hideLabel ? this.args.formField.fieldLabel : null;
  }

  get isGroup() {
    return this.args.formField.options ? true : null;
  }

  @action
  didInsert() {
    //Code below will maintain validation colours when component is re-rendered.
    var formField = this.args.formField;
    const changeset = this.args.changesetWebform.changeset;
    if (changeset.get(formField.propertyName)) {
      formField.eventLog.pushObject('insert');
      this.validateField(formField); // this.send
    }
  }

  @action
  validateField(formField) {
    formField.validate().then((fieldValidationErrors) => {
      this.args.afterFieldValidation(
        formField,
        formField.changeset,
        fieldValidationErrors
      );
    });
  }

  @action
  onChangeAction(formField, value) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    formField.eventLog.pushObject('change');
    this.send('setFieldValue', value, formField);
  }

  @action
  onUserInteractionAction(formField, eventType, value, event) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    formField.eventLog.pushObject(eventType);
    if (eventType === 'keyUp') {
      if (formField.fieldType === 'input' && event.keyCode === 13) {
        if (this.args.submitForm) {
          formField.focussed = false;
          this.args.submitForm(this.args.changesetWebform.changeset);
        }
        return;
      }
      this.send('setFieldValue', value, formField);
    } else if (eventType === 'focusOut') {
      formField.focussed = false;
      formField.eventLog.pushObject('focusOut');
      if (
        value &&
        formField.trim &&
        formField.inputType !== 'password' &&
        typeof value === 'string'
      ) {
        value = value.trim();
      }
      this.send('setFieldValue', value, formField);
    } else if (eventType === 'focusIn') {
      formField.focussed = true;
    }
    this.args.onUserInteraction(formField, eventType, value, event);
  }

  // onUserInteractionClone(...args) {
  //   this.args.onUserInteraction([args]);
  // },

  @action
  setFieldValue(value, formField) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    var changeset = this.args.changesetWebform.changeset;
    formField.previousValue = changeset.get(formField.propertyName);
    changeset.set(formField.propertyName, value);
    if (this.args.onFieldValueChange) {
      this.args.onFieldValueChange(formField, changeset);
    }
    this.send('validateField', formField);
  }
}
