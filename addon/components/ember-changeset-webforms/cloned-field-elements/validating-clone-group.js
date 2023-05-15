import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/cloned-field-elements/validating-clone-group';
import { computed } from '@ember/object';
import FormFieldClone from 'ember-changeset-webforms/utils/form-field-clone';
import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';

export default Component.extend({
  tagName: "",
  layout,
  dataTestCwfFieldValidates: computed.reads('masterFormField.validates'),
  dataTestCwfFieldRequired: computed.reads('masterFormField.required'),

  dataTestId: computed('masterFormField', function() {
    return `clone-group-${this.masterFormField.fieldId}`;
  }),

  didInsertElement() {
    this._super(...arguments);
    var masterFormField = this.masterFormField;
    const changeset = this.changesetWebform.changeset;
    var groupValue = changeset.get(masterFormField.propertyName) || [];
    groupValue.forEach(() => {
      this.send('cloneField', {fromData: true});
    });
    const emptyClones = masterFormField.minClones - groupValue.length;
    for (var i = 0; i < emptyClones; i++) {
      this.send('cloneField');
    } 
  },

  validationStatus: computed('masterFormFieldValidationErrors', 'masterFormField.{eventLog.[]}', function () {
    var formField = this.masterFormField;
    if (!formField) { return; }
    if (!validationEventLog(formField).filter(item => !item.endsWith('Clone')).length) { return }
    var validationErrors = this.masterFormFieldValidationErrors || [];
    if (validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  cloneGroupNameClass: computed('masterFormField.cloneGroupName', function() {
    return `clone-group-${this.masterFormField.cloneGroupName}`;
  }),

  masterFormFieldValidationErrors: computed('changesetWebform.changeset.error', function() {
    const changeset = this.changesetWebform.changeset;
    var validationErrors = ((changeset.get(`error.${this.masterFormField.propertyName}.validation`)) || []);
    const masterFormFieldValidationErrors = [...validationErrors].filter(item => {
      return typeof item !== 'object' || !item.clones;
    });
    return masterFormFieldValidationErrors;
  }),

  cloneId(clonedFields) {
    if (!(clonedFields || []).length) {
      return 0;
    }
    const sortedClones = [...clonedFields].sort((a, b) => {
      return b.cloneId - a.cloneId;
    });
    return sortedClones[0].cloneId + 1;
  },

  actions: {
    onClickAddCloneButton() {
      this.send('cloneField');
      if (this.onUserInteraction) {
        this.onUserInteraction(this.masterFormField, 'addClone');
      }
    },
    
    cloneField(opts = {}) {
      var masterFormField = this.masterFormField;
      masterFormField.set('clonedFields', masterFormField.clonedFields || []);
      var newField = {...masterFormField.clonedFieldBlueprint};
      newField.isClone = true;
      newField.cloneId = this.cloneId(masterFormField.clonedFields);
      newField.eventLog = []; // BD must recreate this, otherwise all clones share the same instance of eventLog array.
      const clone = FormFieldClone.create(newField);
      clone.set('changeset', this.changesetWebform.changeset);
      clone.set('masterFormField', masterFormField);
      masterFormField.clonedFields.pushObject(clone);
      clone.set('index', masterFormField.clonedFields.indexOf(clone));
      var lastIndex = masterFormField.clonedFields.length -1;
      masterFormField.set('lastUpdatedClone', { // TODO does lastUpdatedClone do anything?
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
    },

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
        clone.set('index', index);
      });
      if (this.onUserInteraction) {
        this.onUserInteraction(this.masterFormField, 'addClone');
      }
    },

    checkMinMaxClones(masterFormField) {
      if (masterFormField.maxClones && masterFormField.clonedFields.length >= masterFormField.maxClones) {
        masterFormField.set('cloneCountStatus', 'max');
      } else if (masterFormField.minClones && masterFormField.clonedFields.length === masterFormField.minClones) {
        masterFormField.set('cloneCountStatus', 'min');
      } else {
        masterFormField.set('cloneCountStatus', null); // TODO install ember truth helpers as a dep.
      }
    },
  },

  updatedGroupValue(value, index) {
    var masterFormField = this.masterFormField;
    var groupValue = this.changesetWebform.changeset.get(masterFormField.propertyName) || [];
    masterFormField.set('lastUpdatedClone', {
      index: index,
      previousValue: groupValue[index],
      previousLength: groupValue.length
    });
    groupValue[index] = value;
    return groupValue;
  }
});
