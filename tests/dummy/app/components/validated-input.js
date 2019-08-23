import Component from '@ember/component';
import layout from '../templates/components/validated-input';

export default Component.extend({
  layout,
  actions: {
    validateProperty(changeset, property){
      return changeset.validate(property);
    }
  }
});
