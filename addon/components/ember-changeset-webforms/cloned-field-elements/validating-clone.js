import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class ValidatingClone extends Component {
  dataTestClass = 'cwf-field-clone-wrapper';
  @tracked masterFormField;

  @action
  didInsert() {
    var changeset = this.args.changesetWebform.changeset;
    if (
      changeset.get(this.args.masterFormField.propertyName)[
        this.args.clonedFormField.index
      ]
    ) {
      this.args.clonedFormField.eventLog.pushObject('insert');
      this.args.masterFormField.eventLog.pushObject('insertClone');
      this.args.clonedFormField.updateValidationActivation(
        this.args.clonedFormField.index,
        'insert',
      );
      this.args.validateField(this.args.masterFormField);
    }
  }

  @action
  onUserInteractionClone(eventType, value, event) {
    const clonedFormField = this.args.clonedFormField;
    if (eventType === 'focusOut') {
      clonedFormField.focussed = false;
      if (!this.isDestroyed && !this.isDestroying) {
        this.onChangeClone(value); // this.send
      }
    } else if (eventType === 'focusIn') {
      clonedFormField.focussed = true;
    }
    clonedFormField.eventLog.pushObject(eventType);
    this.args.masterFormField.eventLog.pushObject(`${eventType}Clone`);
    clonedFormField.updateValidationActivation(
      clonedFormField.index,
      eventType,
    );
    this.args.onUserInteraction(`${eventType}Clone`, value, event);
  }

  @action
  onChangeClone(value, eventType = 'change') {
    const clonedFormField = this.args.clonedFormField;
    this.args.clonedFormField.eventLog.pushObject(eventType);
    this.args.masterFormField.eventLog.pushObject(`${eventType}Clone`);
    clonedFormField.updateValidationActivation(
      clonedFormField.index,
      eventType,
    );
    this.args.setFieldValue(
      this.updatedGroupValue(
        value,
        clonedFormField.index,
        this.args.masterFormField,
      ),
      this.args.masterFormField,
    );
  }

  updatedGroupValue(value, index, masterFormField) {
    var groupValue =
      this.args.changesetWebform.changeset.get(masterFormField.propertyName) ||
      [];
    groupValue[index] = value;
    return groupValue;
  }
}
