import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/cloned-field-elements/validating-clone-group';
import FormFieldClone from 'ember-changeset-webforms/utils/form-field-clone';
import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';
import { tracked } from '@glimmer/tracking';

@tagName('')
@templateLayout(layout)
export default class ValidatingCloneGroup extends Component {
  @tracked clonedFields;
  @tracked cloneCountStatus;
  @tracked cloneCountStatus;
  @tracked cloneCountStatus;

  @reads('masterFormField.validates')
  dataTestCwfFieldValidates;

  @reads('masterFormField.required')
  dataTestCwfFieldRequired;

  @computed('masterFormField')
  get dataTestId() {
    return `clone-group-${this.masterFormField.fieldId}`;
  }

  @computed('masterFormFieldValidationErrors', 'masterFormField.{eventLog.[]}')
  get validationStatus() {
    var formField = this.masterFormField;
    if (!formField) {
      return;
    }
    if (!validationEventLog(formField).filter((item) => !item.endsWith('Clone')).length) {
      return;
    }
    var validationErrors = this.masterFormFieldValidationErrors || [];
    if (validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }

  @computed('masterFormField.cloneGroupName')
  get cloneGroupNameClass() {
    return `clone-group-${this.masterFormField.cloneGroupName}`;
  }

  @computed('changesetWebform.changeset.error')
  get masterFormFieldValidationErrors() {
    const changeset = this.changesetWebform.changeset;
    var validationErrors = changeset.get(`error.${this.masterFormField.propertyName}.validation`) || [];
    const masterFormFieldValidationErrors = [...validationErrors].filter((item) => {
      return typeof item !== 'object' || !item.clones;
    });
    return masterFormFieldValidationErrors;
  }

  cloneId(clonedFields) {
    if (!(clonedFields || []).length) {
      return 0;
    }
    const sortedClones = [...clonedFields].sort((a, b) => {
      return b.cloneId - a.cloneId;
    });
    return sortedClones[0].cloneId + 1;
  }

  @action
  didInsert() {
    var masterFormField = this.masterFormField;
    const changeset = this.changesetWebform.changeset;
    var groupValue = changeset.get(masterFormField.propertyName) || [];
    groupValue.forEach(() => {
      this.send('cloneField', { fromData: true });
    });
    const emptyClones = masterFormField.minClones - groupValue.length;
    for (var i = 0; i < emptyClones; i++) {
      this.send('cloneField');
    }
  }

  @action
  onClickAddCloneButton() {
    this.send('cloneField');
    if (this.onUserInteraction) {
      this.onUserInteraction(this.masterFormField, 'addClone');
    }
  }

  @action
  cloneField(opts = {}) {
    var masterFormField = this.masterFormField;
    masterFormField.clonedFields = masterFormField.clonedFields || [];
    var newField = { ...masterFormField.clonedFieldBlueprint };
    newField.isClone = true;
    newField.cloneId = this.cloneId(masterFormField.clonedFields);
    newField.eventLog = []; // BD must recreate this, otherwise all clones share the same instance of eventLog array.
    const clone = FormFieldClone.create(newField);
    clone.changeset = this.changesetWebform.changeset;
    clone.masterFormField = masterFormField;
    masterFormField.clonedFields.pushObject(clone);
    clone.index = masterFormField.clonedFields.indexOf(clone);
    var lastIndex = masterFormField.clonedFields.length - 1;
    masterFormField.set('lastUpdatedClone', {
      // TODO does lastUpdatedClone do anything?
      index: lastIndex,
      previousValue: null,
    });
    if (!opts.fromData) {
      var fieldValue = this.changesetWebform.changeset.get(masterFormField.propertyName) || [];
      fieldValue.push(opts.newCloneValue || newField.defaultValue);
      this.setFieldValue(fieldValue, masterFormField);
    }

    this.send('checkMinMaxClones', masterFormField);
    // onUserInteraction is not fired here, as this function can be run automatically when inserting clones to match initial field data.
    if (this.afterAddClone) {
      this.afterAddClone(newField, masterFormField, this.changesetWebform);
    }
  }

  @action
  removeClone(clone) {
    var masterFormField = this.masterFormField;
    var index = masterFormField.clonedFields.indexOf(clone);
    masterFormField.clonedFields.removeObject(clone);
    this.send('checkMinMaxClones', masterFormField);
    var groupValue = this.changesetWebform.changeset.get(masterFormField.propertyName) || []; //TODO check this.
    groupValue.splice(index, 1);
    masterFormField.eventLog.pushObject('removeClone');
    this.setFieldValue(groupValue, masterFormField);

    masterFormField.clonedFields.forEach((clone, index) => {
      clone.index = index;
    });
    if (this.onUserInteraction) {
      this.onUserInteraction(this.masterFormField, 'addClone');
    }
  }

  @action
  checkMinMaxClones(masterFormField) {
    if (masterFormField.maxClones && masterFormField.clonedFields.length >= masterFormField.maxClones) {
      masterFormField.cloneCountStatus = 'max';
    } else if (masterFormField.minClones && masterFormField.clonedFields.length === masterFormField.minClones) {
      masterFormField.cloneCountStatus = 'min';
    } else {
      masterFormField.cloneCountStatus = null;
    }
  }

  updatedGroupValue(value, index) {
    var masterFormField = this.masterFormField;
    var groupValue = this.changesetWebform.changeset.get(masterFormField.propertyName) || [];
    masterFormField.set('lastUpdatedClone', {
      index: index,
      previousValue: groupValue[index],
      previousLength: groupValue.length,
    });
    groupValue[index] = value;
    return groupValue;
  }
}
