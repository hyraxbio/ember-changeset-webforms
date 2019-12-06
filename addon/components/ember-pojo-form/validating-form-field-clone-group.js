import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/validating-form-field-clone-group';
import { computed } from '@ember/object';
import generateEmberValidatingFormField from '../../utils/generate-ember-validating-form-field';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  emberPojoForms: service(),
  classNames: ['clone-group'],
  classNameBindings: ['cloneGroupNameClass'],

  init() {
    this._super(...arguments);
    this.fieldComponentsMap = assign(this.get('emberPojoForms.defaultFieldElementComponents'), this.get('emberPojoForms.customFieldElementComponents'));
    this.formSettings = assign(this.get('emberPojoForms.defaultSettings'), this.get('emberPojoForms.settings'));
  },

  didInsertElement() {
    var masterFormField = this.get('masterFormField');
    var minLength = Math.max((this.get('groupValue') || []).length, masterFormField.minClones,  1);
    for (var i = 0; i < minLength; i++) {
      var value = this.get('groupValue')[i] || null;
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
      var newField = generateEmberValidatingFormField(newFieldSchema, this.get('fieldComponentsMap'));
      newField.set('isClone', true);
      masterFormField.clonedFields.pushObject(newField);
      var groupValue = this.get('groupValue') || [];
      var lastIndex = masterFormField.clonedFields.length -1;
      groupValue[lastIndex] = defaultValue;
      this.setFieldValue(groupValue);
      this.send('checkMinMaxClones', masterFormField);
    },

    removeClone(clone) {
      var masterFormField = this.get('masterFormField');
      var index = masterFormField.clonedFields.indexOf(clone);
      masterFormField.clonedFields.removeObject(clone);
      this.send('checkMinMaxClones', masterFormField);
      var groupValue = this.get('groupValue') || [];
      groupValue.splice(index, 1);
      this.setFieldValue(groupValue);

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
