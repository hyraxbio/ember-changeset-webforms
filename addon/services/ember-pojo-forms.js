import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.defaultSettings = {
      novalidate: true,
      submitButtonIcon: 'ember-pojo-form/submit-button-icon',
      submitButtonIconClassNames: 'button-right spinner',
      addCloneButtonComponent: 'ember-pojo-form/add-clone-button',
      submitButtonIconRequestInFlightClassNames: 'on',
      powerDatePicker: {
        dateSelectComponent: null
      }
    };

    this.defaultFieldElementComponents = {
      input:            {
        componentPath: 'ember-pojo-form/form-field-input'
      },
      clonable:         {
        componentPath: 'ember-pojo-form/validating-form-field-clone-group'
      },
      textarea:         {
        componentPath: 'ember-pojo-form/form-field-textarea'
      },
      powerSelect:      {
        componentPath: 'ember-pojo-form/form-field-power-select'
      },
      powerDatePicker:  {
        componentPath: 'ember-pojo-form/form-field-power-datepicker'
      },
      singleCheckbox:   {
        componentPath: 'ember-pojo-form/form-field-checkbox'
      },
      radioButtonGroup: {
        componentPath: 'ember-pojo-form/form-field-radio-button-group'
      },
      checkboxGroup:    {
        componentPath: 'ember-pojo-form/form-field-checkbox-group',
      },
      dateRange:        {
        componentPath: 'ember-pojo-form/form-field-date-range'
      },
      tagSelector:      {
        componentPath: 'ember-pojo-form/form-field-tag-selector'
      },
      button:           {
        componentPath: 'ember-pojo-form/form-field-button',
        castOut: true
      },
      staticContent:    {
        componentPath: 'ember-pojo-form/form-field-static-content',
        castOut: true
      }
    };
  }
});