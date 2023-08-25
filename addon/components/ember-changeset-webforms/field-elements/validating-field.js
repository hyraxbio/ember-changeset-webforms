import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
// import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/validating-field';

@templateLayout(layout)
@tagName('')
export default class ValidatingField extends Component {
  @computed('dataTestId', 'dataTestFormName', 'formField.dataTestFieldName')
  get dataTestFieldId() {
    if (this.dataTestId) {
      return this.dataTestId;
    }
    return [this.dataTestFormName, this.formField.dataTestFieldName || this.formField.fieldId].filter((item) => item).join('-');
  }

  @computed('formField.fieldType')
  get typeClass() {
    var myStr = this.formField.fieldType;
    myStr = myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `field-type-${myStr}`;
  }

  @computed('formField.name')
  get labelId() {
    return `${this.formField.name}-label`;
  }

  @computed('labelId')
  get ariaLabelledBy() {
    if (!this.formField.hideLabel) {
      return this.labelId;
    }
    return;
  }

  @computed('formField.{hideLabel,fieldLabel}')
  get ariaLabel() {
    return this.formField.hideLabel ? this.formField.fieldLabel : null;
  }

  @computed('formField.options')
  get isGroup() {
    return this.formField.options ? true : null;
  }

  @action
  didInsert() {
    //Code below will maintain validation colours when component is re-rendered.
    var formField = this.formField;
    const changeset = this.changesetWebform.changeset;
    if (changeset.get(formField.propertyName)) {
      formField.eventLog.pushObject('insert');
      this.send('validateField', formField);
    }
  }

  @action
  validateField(formField) {
    formField.validate().then((fieldValidationErrors) => {
      this.afterFieldValidation(formField, formField.changeset, fieldValidationErrors);
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
        if (this.submitForm) {
          formField.focussed = false;
          this.submitForm(this.changesetWebform.changeset);
        }
        return;
      }
      this.send('setFieldValue', value, formField);
    } else if (eventType === 'focusOut') {
      formField.focussed = false;
      formField.eventLog.pushObject('focusOut');
      if (value && formField.trim && formField.inputType !== 'password' && typeof value === 'string') {
        value = value.trim();
      }
      this.send('setFieldValue', value, formField);
    } else if (eventType === 'focusIn') {
      formField.focussed = true;
    }
    this.onUserInteraction(formField, eventType, value, event);
  }

  // onUserInteractionClone(...args) {
  //   this.onUserInteraction([args]);
  // },

  @action
  setFieldValue(value, formField) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    var changeset = this.changesetWebform.changeset;
    formField.previousValue = changeset.get(formField.propertyName);
    changeset.set(formField.propertyName, value);
    if (this.onFieldValueChange) {
      this.onFieldValueChange(formField, changeset);
    }
    this.send('validateField', formField);
  }
}
