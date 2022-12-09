import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/cloned-field-elements/validating-clone-group';
import { computed } from '@ember/object';
import FormFieldClone from 'ember-changeset-webforms/utils/form-field-clone';
import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';

export default Component.extend({
  layout,
  classNames: ['clone-group', 'ember-changeset-webforms-clone-group'],
  classNameBindings: ['cloneGroupNameClass', 'validationStatus', 'masterFormField.required:required', 'disabled:disabled', 'readonly:readonly', 'masterFormField.fieldClassNames', 'masterFormField.hideSuccessValidation:hide-success-validation', 'masterFormField.validates:validates', 'typeClass', 'masterFormField.focussed:focussed'],

  'data-test-cwf-field-validates': computed('masterFormField.validates', function() {
    return this.get('masterFormField.validates');
  }),

  'data-test-cwf-field-required': computed('masterFormField.required', function() {
    return this.get('masterFormField.required');
  }),

  'data-test-id': computed('masterFormField', function() {
    return `clone-group-${this.get('masterFormField.fieldId')}`;
  }),

  didInsertElement() {
    var masterFormField = this.get('masterFormField');
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

  masterFormFieldValidationErrors: computed('changesetWebform.changeset.error', function() {
    var validationErrors = ((this.get(`changesetWebform.changeset.error.${this.get('masterFormField.propertyName')}.validation`)) || []);
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
      if (this.get('afterClickAddCloneButton')) {
        this.afterClickAddCloneButton();
      } 
    },
    
    cloneField(opts = {}) {
      var masterFormField = this.get('masterFormField');
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
      if (this.get('afterAddClone')) {
        this.afterAddClone(newField, masterFormField, this.changesetWebform.changeset);
      } 
    },

    removeClone(clone) {
      var masterFormField = this.get('masterFormField');
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

      if (this.get('afterRemoveClone')) {
        this.afterRemoveClone(clone, masterFormField, this.changesetWebform.changeset);
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
    var masterFormField = this.get('masterFormField');
    var groupValue = this.changesetWebform.changeset.get(masterFormField.propertyName) || [];
    masterFormField.set('lastUpdatedClone', {
      index: index,
      previousValue: groupValue[index],
      previousLength: groupValue.length
    });
    groupValue[index] = value;
    return groupValue;
  },
});
