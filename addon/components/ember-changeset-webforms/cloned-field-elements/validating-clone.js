import { action } from '@ember/object';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/cloned-field-elements/validating-clone';
import { tracked } from '@glimmer/tracking';
@tagName('')
@templateLayout(layout)
export default class ValidatingClone extends Component {
  dataTestClass = 'cwf-field-clone-wrapper';
  @tracked masterFormField;

  @action
  didInsert() {
    var changeset = this.changesetWebform.changeset;
    if (changeset.get(this.masterFormField.propertyName)[this.clonedFormField.index]) {
      this.clonedFormField.eventLog.pushObject('insert');
      this.masterFormField.eventLog.pushObject('insertClone');
      this.clonedFormField.updateValidationActivation(this.clonedFormField.index, 'insert');
      this.validateField(this.masterFormField);
    }
  }

  @action
  onUserInteractionClone(index, clonedFormField, eventType, value, event) {
    if (eventType === 'focusOut') {
      clonedFormField.focussed = false;
      if (!this.isDestroyed && !this.isDestroying) {
        this.send('onChangeClone', index, clonedFormField, value);
      }
    } else if (eventType === 'focusIn') {
      clonedFormField.focussed = true;
    }
    clonedFormField.eventLog.pushObject(eventType);
    this.masterFormField.eventLog.pushObject(`${eventType}Clone`);
    clonedFormField.updateValidationActivation(index, eventType);
    this.onUserInteraction(clonedFormField, `${eventType}Clone`, value, event);
  }

  @action
  onChangeClone(index, clonedFormField, value, eventType = 'change') {
    clonedFormField.eventLog.pushObject(eventType);
    this.masterFormField.eventLog.pushObject(`${eventType}Clone`);
    clonedFormField.updateValidationActivation(index, eventType);
    this.setFieldValue(this.updatedGroupValue(value, index), this.masterFormField);
  }
}
