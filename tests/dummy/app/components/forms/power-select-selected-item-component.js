import { layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../templates/components/forms/power-select-selected-item-component';

@templateLayout(layout)
export default class PowerSelectSelectedItemComponent extends Component {
  init() {
    super.init(arguments);
    this.countries = [
      {
        id: 'ABW',
        name: 'Aruba',
      },
      {
        id: 'AFG',
        name: 'Afghanistan',
      },
      {
        id: 'AGO',
        name: 'Angola',
      },
      {
        id: 'ALB',
        name: 'Albania',
      },
      {
        id: 'AND',
        name: 'Andorra',
      },
    ];
  }

  @computed('option')
  get displayCountry() {
    const related = this.countries.find(
      (country) => country.id === this.option,
    );
    return related.name;
  }
}
