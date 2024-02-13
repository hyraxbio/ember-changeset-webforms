import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ValidatingField extends Component {
  get dataTestFieldId() {
    if (this.args.dataTestId) {
      return this.args.dataTestId;
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
    return this.args.formField.hideLabel
      ? this.args.formField.fieldLabel
      : null;
  }

  get isGroup() {
    return this.args.formField.options ? true : null;
  }

  @action
  didInsert() {
    var formField = this.args.formField;
    const changeset = this.args.changesetWebform.changeset;
    if (changeset.get(formField.propertyName)) {
      formField.eventLog.pushObject('insert');
      this.validateField(formField);
    }
    this.args.onFieldInserted(this.args.formField);
  }

  @action
  validateField(formField) {
    formField.validate().then((fieldValidationErrors) => {
      this.args.afterFieldValidation(
        formField,
        formField.changeset,
        fieldValidationErrors,
      );
    });
  }

  // @action
  // onChange(value) {
  //   const formField = this.args.formField;
  //   if (this.isDestroyed || this.isDestroying) {
  //     return;
  //   }
  //   formField.eventLog.pushObject('change');
  //   this.setFieldValue(value, formField);
  // }
  @action
  onUserInteraction(eventType, value, event) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    const formField = this.args.formField;
    formField.eventLog.pushObject(eventType);
    this.validateField(formField);
    this.args.onUserInteraction(formField, eventType, value, event);
  }

  @action
  updateFieldValue(value) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    const formField = this.args.formField;
    formField.eventLog.pushObject('change');
    var changeset = this.args.changesetWebform.changeset;
    formField.previousValue = changeset.get(formField.propertyName);
    changeset.set(formField.propertyName, value);
    this.validateField(formField);

    if (this.args.onFieldValueChange) {
      this.args.onFieldValueChange(formField, changeset);
    }
  }
}
