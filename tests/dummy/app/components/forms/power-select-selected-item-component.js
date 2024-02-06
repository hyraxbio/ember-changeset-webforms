import Component from '@glimmer/component';

export default class PowerSelectSelectedItemComponent extends Component {
  countries = [
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

  get displayCountry() {
    const related = this.countries.find(
      (country) => country.id === this.option,
    );
    return related.name;
  }
}
