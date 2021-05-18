import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/cloned-field-elements/validating-clone-group';
import { computed } from '@ember/object';
import parseChangesetWebformField from 'ember-changeset-webforms/utils/parse-changeset-webform-field';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  EmberChangesetWebforms: service(),
  classNames: ['clone-group'],
  classNameBindings: ['cloneGroupNameClass'],

  'data-test-id': computed('masterFormField', function() {
    return `clone-group-${this.get('masterFormField.fieldId')}`;
  }),

  init() {
    this._super(...arguments);
    this.fieldComponentsMap = assign(this.get('EmberChangesetWebforms.defaultFieldElementComponents'), this.get('EmberChangesetWebforms.customFieldElementComponents'));
    this.formSettings = assign(this.get('EmberChangesetWebforms.defaultSettings'), this.get('EmberChangesetWebforms.settings'));
  },

  didInsertElement() {
    var masterFormField = this.get('masterFormField');
    var minLength = Math.max((this.get('groupValue') || []).length, masterFormField.minClones);
    for (var i = 0; i < minLength; i++) {
      var value = this.get('groupValue') ? this.get('groupValue')[i] : null;
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
      var newField = parseChangesetWebformField(newFieldSchema, this.get('fieldComponentsMap'));
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
      var groupValue = this.get('groupValue') || [];
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

   
  }
});
