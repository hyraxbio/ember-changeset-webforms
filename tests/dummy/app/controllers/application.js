import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { get }   from '@ember/object';
import Changeset from 'ember-changeset';
import UserValidations from '../validations/user';
export default Controller.extend({
  UserValidations,
  init() {
    this._super(...arguments);
    this.model = EmberObject.create({
      firstName: null,
      level: 78
    });
    // let validator = get(this, 'validate');
    // this.changeset = new Changeset(this.get('model'), validator);
  },
  
  actions: {
    setProperty: function(property, value) {
      this.set(property, value);
    },

    toggleProperty: function(property) {
      this.toggleProperty(property);
    },

    onUserInteraction(value) {
      this.set('formField.value', value);
    },

    submit(changeset) {
      changeset.validate().then(()=>{
        if(changeset.get("isValid")){
          changeset.save().then(()=>{
            // this.transitionToRoute('monsters.monster.show', this.get("model"));
            alert('Saved')
          });
        } else {
          alert('Fix errors before saving')
        }
      })
      // return changeset.save();
    },
 
    rollback(changeset) {
      return changeset.rollback();
    },
 
    validate({ key, newValue, oldValue, changes, content }) {
      return false;
    }
  }
});
