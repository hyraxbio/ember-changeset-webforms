import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/cloned-field-elements/validating-clone-group';
import { computed } from '@ember/object';
import EmberObject from '@ember/object';
import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';

export default Component.extend({
  layout,
  classNames: ['clone-group', 'ember-changeset-webforms-clone-group'],
  classNameBindings: ['cloneGroupNameClass', 'displayValidation', 'masterFormField.required:required', 'disabled:disabled', 'readonly:readonly', 'masterFormField.fieldClasses', 'masterFormField.hideSuccessValidation:hide-success-validation', 'masterFormField.validates:validates', 'typeClass', 'masterFormField.focussed:focussed'],

  'data-test-ember-changeset-webforms-field-validates': computed('masterFormField.validates', function() {
    return this.get('masterFormField.validates');
  }),

  'data-test-ember-changeset-webforms-field-required': computed('masterFormField.required', function() {
    return this.get('masterFormField.required');
  }),

  'data-test-id': computed('masterFormField', function() {
    return `clone-group-${this.get('masterFormField.fieldId')}`;
  }),

  didInsertElement() {
    var masterFormField = this.get('masterFormField');
    var groupValue = this.get('changesetProp').get(masterFormField.propertyName) || [];
    groupValue.forEach(() => {
      this.send('cloneField', {fromData: true});
    });
    const emptyClones = masterFormField.minClones - groupValue.length;
    for (var i = 0; i < emptyClones; i++) {
      this.send('cloneField');
    } 
  },

  displayValidation: computed('masterFormFieldValidationErrors', 'masterFormField.{eventLog.[]}', function () {
    var formField = this.get('masterFormField');
    if (!formField) { return; }
    if (!validationEventLog(formField).filter(item => !item.endsWith('Clone')).length) { return }
    var validationErrors = this.get('masterFormFieldValidationErrors') || [];
    if (validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  cloneGroupNameClass: computed('masterFormField.cloneGroupName', function() {
    return `clone-group-${this.get('masterFormField.cloneGroupName')}`;
  }),

  masterFormFieldValidationErrors: computed('changesetProp.error', function() {
    var validationErrors = ((this.get(`changesetProp.error.${this.get('masterFormField.propertyName')}.validation`)) || []);
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
    cloneField(opts = {}) {
      var masterFormField = this.get('masterFormField');
      masterFormField.set('clonedFields', masterFormField.clonedFields || []);
      var newField = {...masterFormField.clonedFieldBlueprint};
      newField.isClone = true;
      newField.cloneId = this.cloneId(masterFormField.clonedFields);
      newField.eventLog = []; // BD must recreate this, otherwise all clones share the same instance of eventLog array.
      masterFormField.clonedFields.pushObject(EmberObject.create(newField));
      var lastIndex = masterFormField.clonedFields.length -1;
      masterFormField.set('lastUpdatedClone', {
        index: lastIndex,
        previousValue: null,
      });
      if (!opts.fromData) {
        var fieldValue = this.get('changesetProp').get(masterFormField.propertyName) || [];
        fieldValue.push(opts.newCloneValue || newField.defaultValue);
        this.setFieldValue(fieldValue, masterFormField);
      }
      
      this.send('checkMinMaxClones', masterFormField);
      if (this.get('afterAddClone')) {
        this.afterAddClone(newField, masterFormField, this.get('changesetProp'));
      } 
    },

    removeClone(clone) {
      var masterFormField = this.get('masterFormField');
      var index = masterFormField.clonedFields.indexOf(clone);
      masterFormField.clonedFields.removeObject(clone);
      this.send('checkMinMaxClones', masterFormField);
      var groupValue = this.get('changesetProp').get(masterFormField.propertyName) || []; //TODO check this.
      groupValue.splice(index, 1);
      masterFormField.eventLog.pushObject('removeClone');
      this.setFieldValue(groupValue, masterFormField);
      if (this.get('afterRemoveClone')) {
        this.afterRemoveClone(clone, masterFormField, this.get('changesetProp'));
      }
    },

    checkMinMaxClones(masterFormField) {
      if (masterFormField.clonedFields.length === masterFormField.maxClones) {
        masterFormField.set('cloneCountStatus', 'max');
      } else if (masterFormField.clonedFields.length === masterFormField.minClones) {
        masterFormField.set('cloneCountStatus', 'min');
      } else {
        masterFormField.set('cloneCountStatus', null); // TODO install ember truth helpers as a dep.
      }
    },
  },

  updatedGroupValue(value, index) {
    var masterFormField = this.get('masterFormField');
    var groupValue = this.get('changesetProp').get(masterFormField.propertyName) || [];
    masterFormField.set('lastUpdatedClone', {
      index: index,
      previousValue: groupValue[index],
      previousLength: groupValue.length
    });
    groupValue[index] = value;
    return groupValue;
  },
});
