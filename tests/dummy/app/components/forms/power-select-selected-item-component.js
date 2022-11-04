import Component from '@ember/component';
import layout from '../../templates/components/forms/power-select-selected-item-component';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  init() {
    this._super(arguments);
    this.countries = [{
      id: 'ABW',
      name: 'Aruba'
    },
    {
      id: 'AFG',
      name: 'Afghanistan'
    },
    {
      id: 'AGO',
      name: 'Angola'
    },
    {
      id: 'ALB',
      name: 'Albania'
    },
    {
      id: 'AND',
      name: 'Andorra'
    }]
  },

  displayCountry: computed('option', function() {
    const related = this.countries.find(country => country.id === this.option);
    return related.name;
  }),
});
