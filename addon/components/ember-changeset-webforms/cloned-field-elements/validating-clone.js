import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class ValidatingClone extends Component {
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
      this.args.clonedFormField.updateValidationActivation();
      this.args.validateField(this.args.masterFormField);
    }
  }

  @action
  onUserInteractionClone(eventName, value, event) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    const clonedFormField = this.args.clonedFormField;
    if (eventName === 'focusOut') {
      clonedFormField.focussed = false;
    } else if (eventName === 'focusIn') {
      clonedFormField.focussed = true;
    }
    clonedFormField.eventLog.pushObject(eventName);
    this.args.masterFormField.eventLog.pushObject(`${eventName}Clone`);
    clonedFormField.updateValidationActivation();
    this.args.onUserInteraction(`${eventName}Clone`);
  }

  @action
  updateCloneValue(value) {
    const clonedFormField = this.args.clonedFormField;
    this.args.clonedFormField.eventLog.pushObject('valueUpdated');
    this.args.masterFormField.eventLog.pushObject('valueUpdatedClone');
    clonedFormField.updateValidationActivation();
    this.args.updateFieldValue(
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
    if (groupValue[index] === value) {
      return groupValue; // TODO tests // Because if groupValue is an array of models, and itself a model property, you get this error: "You can only 'replaceRelatedRecord' on a belongsTo relationship. *** is a hasMany". In the case, the field should have updated the value by now anyway.
    }
    masterFormField.lastUpdatedClone = {
      index: index,
      previousValue: groupValue[index],
      previousLength: groupValue.length,
    };

    groupValue[index] = value;
    return groupValue;
  }
}
