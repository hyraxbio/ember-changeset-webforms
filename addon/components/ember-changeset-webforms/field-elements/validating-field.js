import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ValidatingField extends Component {
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

  get ariaErrorMessage() {
    return (this.args.formField.validationErrors || []).length
      ? `${this.args.formField.id}-errors`
      : null;
  }

  get ariaDescribedBy() {
    return this.args.formField.fieldDescription
      ? `${this.args.formField.id}-description`
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
    formField
      .validate()
      .then((fieldValidationErrors) => {
        this.args.afterFieldValidation(
          formField,
          formField.changeset,
          fieldValidationErrors,
        );
      })
      .catch((err) => console.log(err));
  }

  @action
  onUserInteraction(eventName, value, event) {
    const formField = this.args.formField;

    if (this.isDestroyed || this.isDestroying || formField.disabled) {
      return;
    }
    formField.eventLog.pushObject(eventName);
    this.validateField(formField);
    this.args.onUserInteraction(formField, eventName, value, event);
  }

  @action
  updateFieldValue(value) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    const formField = this.args.formField;
    formField.updateValue(value);
    this.validateField(formField);
    if (this.args.onFieldValueChange) {
      this.args.onFieldValueChange(
        formField,
        this.args.changesetWebform.changeset,
      );
    }
  }
}
