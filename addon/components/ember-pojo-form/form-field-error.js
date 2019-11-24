import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/form-field-error';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  parsedError: computed('error', function() {
    
  }),
});
