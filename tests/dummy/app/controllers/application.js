import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { get }   from '@ember/object';
import Changeset from 'ember-changeset';
// import UserValidations from '../validations/user';
// import { validatePresence, validateNumber } from 'ember-changeset-validations/validators';
import validators from 'ember-changeset-validations/validators';
import incrementValidator from '../validators/increment';
export default Controller.extend({
  // UserValidations,
  validators,
  init() {
    this._super(...arguments);
    this.UserValidations = {
      firstName: this.get('validators').validatePresence(true),
      level: [
        this.get('validators').validatePresence(true),
        this.get('validators').validateNumber({gte: 1, lte: 99}),
        this.get('validators').validateNumber({integer: true}),
        incrementValidator(2)
      ]
    };
    this.model = EmberObject.create({
      firstName: null,
      level: 78
    });
    // let validator = get(this, 'validate');
    // this.changeset = new Changeset(this.get('model'), validator);
  },
  
  actions: {
    // setProperty: function(property, value) {
    //   this.set(property, value);
    // },

    // toggleProperty: function(property) {
    //   this.toggleProperty(property);
    // },

    // onUserInteraction(value) {
    //   this.set('formField.value', value);
    // },

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
