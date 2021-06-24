import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/cloned-field-elements/validating-clone-group';
import { computed } from '@ember/object';
import parseChangesetWebformField from 'ember-changeset-webforms/utils/parse-changeset-webform-field';
import { assign } from '@ember/polyfills';

export default Component.extend({
  layout,
  classNames: ['clone-group'],
  classNameBindings: ['cloneGroupNameClass'],

  'data-test-id': computed('masterFormField', function() {
    return `clone-group-${this.get('masterFormField.fieldId')}`;
  }),

  didInsertElement() {
    var masterFormField = this.get('masterFormField');
    var groupValue = this.get('changesetProp').get(masterFormField.propertyName) || [];
    var minLength = Math.max((groupValue || []).length, masterFormField.minClones);
    for (var i = 0; i < minLength; i++) {
      var value = groupValue ? groupValue[i] : null;
      this.send('cloneField', value);
    } 
  },

  cloneGroupNameClass: computed('masterFormField.cloneGroupName', function() {
    return `clone-group-${this.get('masterFormField.cloneGroupName')}`;
  }),

  actions: {
    cloneField(defaultValue) {
      var masterFormField = this.get('masterFormField');
      masterFormField.set('clonedFields', masterFormField.clonedFields || []);
      var newFieldSchema = assign(this.get('masterFormField.cloneFieldSchema'), { fieldId: masterFormField.fieldId, cloneIndex: masterFormField.clonedFields.length });
      var newField = parseChangesetWebformField(newFieldSchema);
      newField.set('isClone', true);
      masterFormField.clonedFields.pushObject(newField);
      var fieldValue = this.get('changesetProp').get(masterFormField.propertyName) || [];
      var lastIndex = masterFormField.clonedFields.length -1;
      const newValue = defaultValue || newField.defaultValue;
      fieldValue.push(newValue);
      masterFormField.set('lastUpdatedClone', {
        index: lastIndex,
        previousValue: null,
      });
      this.setFieldValue(fieldValue, masterFormField);
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

      this.setFieldValue(groupValue, masterFormField);

      if (this.get('afterRemoveClone')) {
        this.afterRemoveClone(clone, masterFormField, this.get('changesetProp'));
      } 
      // if (masterFormField.cloneFieldSchema.validationEvents.indexOf('removeClone') > -1) {
      //   this.validateProperty(this.get('changeset'));
      // }
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

    onFocusOutClone(index, clonedFormField, value) {
      this.onFocusOut(clonedFormField, this.updatedGroupValue(value, index));
    },

    onFocusInClone(index, clonedFormField) {
      this.onFocusIn(clonedFormField);
    },

    onKeyUpClone(index, clonedFormField, value, event) {
      this.onKeyUp(clonedFormField, this.updatedGroupValue(value, index), event);
    },

    onUserInteractionClone(index, clonedFormField, value) {
      this.onUserInteraction(clonedFormField, this.updatedGroupValue(value, index));
    },

    onChangeClone(index, clonedFormField, value) {
      // this.onChange(clonedFormField, this.updatedGroupValue(value, index));
    }
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
