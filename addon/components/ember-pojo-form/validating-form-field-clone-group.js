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
      this.send('cloneField');
    } 
    var masterFieldValue = masterFormField.clonedFields.map((clonedField, index) => {
      return this.get('groupValue')[index] || clonedField.cloneDefaultValue;
    });

    this.setFieldValue(masterFieldValue);
  },

  cloneGroupNameClass: computed('masterFormField.cloneGroupName', function() {
    return `clone-group-${this.get('masterFormField.cloneGroupName')}`;
  }),

  // groupValue: computed('changeset', function() {
  //   console.log('group value cp')
  //   var changeset = this.get('changeset');
  //   return changeset.get(this.get('masterFormField.fieldId'));
  // }),

  actions: {
    cloneField() {
      var masterFormField = this.get('masterFormField');

      // var masterFieldSchema = this.get('formSchema.fields').find((field) => {
      //   return field.fieldId === cloneGroupName;
      // });
      // var masterFieldObject = this.get('formFields').find(field => {
      //   return field.fieldId === cloneGroupName;
      // });

      var newField = generateEmberValidatingFormField(this.get('masterFormField.schema'), this.get('fieldComponentsMap'));
      // var newFieldCloneNumber;
      // if (!masterFieldObject.clonedFields) {
      //   newFieldCloneNumber = 1;
      // } else {
      //   newFieldCloneNumber = parseInt(masterFieldObject.clonedFields.map(item => {
      //     return item.cloneGroupNumber;
      //   }).sort((a, b) => { return b - a; })) + 1;
      // }
      
      // newField.set('cloneGroupNumber', newFieldCloneNumber);
      newField.set('fieldId', `${newField.fieldId}-clone`);
      newField.set('isClone', true);
      newField.set('placeholder', newField.fieldId);

      masterFormField.set('clonedFields', masterFormField.clonedFields || []);
      
      masterFormField.clonedFields.pushObject(newField);
      
      
    },

    removeClone(masterFormField, changeset, formFields) {
      masterFormField.set('hidden', true);
      changeset.rollbackProperty(masterFormField.fieldId);
      changeset.validate(masterFormField.fieldId);
      changeset.set('error.invitation', null);
      // console.log(changeset.get('error'));
      this.send('checkCloneMax', masterFormField.cloneGroupName);
    },

    checkCloneMax(cloneGroupName) {
      this.cloneGroup(cloneGroupName).setEach('lastClone', false);
      this.cloneGroupVisible(cloneGroupName)[this.cloneGroupVisible(cloneGroupName).length - 1].set('lastClone', true);
      if (this.cloneGroupVisible(cloneGroupName).length >= this.maxAllowedClones(cloneGroupName)) {
        this.cloneGroup(cloneGroupName).setEach('maxClonesPresent', true);
      } else {
        this.cloneGroup(cloneGroupName).setEach('maxClonesPresent', false);
      }
      if (this.cloneGroupVisible(cloneGroupName).length === 1) {
        this.cloneGroupVisible(cloneGroupName).setEach('onlyClone', true);
      } else {
        this.cloneGroupVisible(cloneGroupName).setEach('onlyClone', false);
      }
    },

    onFocusOutClone(index, value) {
      this.onFocusOut(this.updatedGroupValue(value, index));
      // this.send('setGroupValue', value, index);
    },

    onFocusInClone(index, value) {
      this.onFocusIn(this.updatedGroupValue(value, index));
      // this.send('setGroupValue', value);
    },
    onKeyUpClone(index, value) {
      this.onKeyUp(this.updatedGroupValue(value, index));
      // this.send('setGroupValue', value, index);
    },

    onUserInteractionClone(index, value) {
      this.onUserInteraction(this.updatedGroupValue(value, index));
      // this.send('setGroupValue', value, index);
    },

    // setGroupValue(value, index) {
    //   var groupValue = this.get('groupValue') || [];
    //   groupValue[index] = value;
    //   this.setFieldValue(groupValue);
    // }
  },

  updatedGroupValue(value, index) {
    var groupValue = this.get('groupValue') || [];
    console.log(groupValue);
    groupValue[index] = value;
    return groupValue;
  }
});
