import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  computedVectorEffect: computed('vectorEffect', function() {
    return this.get('vectorEffect') || 'non-scaling-stroke';
  }),
});
