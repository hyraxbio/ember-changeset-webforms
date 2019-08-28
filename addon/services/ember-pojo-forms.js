import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.settings = {
      novalidate: true,
      submitButtonIcon: 'ember-pojo-form/submit-button-icon',
      submitButtonIconClassNames: 'button-right spinner',
      submitButtonIconRequestInFlightClassNames: 'on',
      powerDatePicker: {
        dateSelectComponent: null
      }
    };
  }
  
  
});