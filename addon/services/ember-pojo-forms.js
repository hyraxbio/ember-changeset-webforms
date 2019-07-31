import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.settings = {
      submitButtonIcon: 'ember-pojo-form/submit-button-icon',
      submitButtonIconClassNames: 'button-right spinner',
      submitButtonIconRequestInFlightClassNames: 'on',
      powerDatePicker: {
        dateSelectComponent: null
      }
    };
  }
  
  
});