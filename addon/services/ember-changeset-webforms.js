import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.defaultSettings = {
      novalidate: true,
      submitButtonIcon: 'ember-changeset-webforms/form-elements/submit-button-icon',
      submitButtonIconClassNames: 'button-right spinner',
      addCloneButtonComponent: 'ember-changeset-webforms/cloned-field-elements/add-clone-button',
      submitButtonIconRequestInFlightClassNames: 'on',
      // removeCloneIcon: 'svg-repo/icons-icon-trash',
      resetButtonText: 'Reset',
      powerDatePicker: {
        dateSelectComponent: null
      }
    };

    this.defaultFieldElementComponents = {
      input:            {
        componentPath: 'ember-changeset-webforms/fields/input'
      },
      clonable:         {
        componentPath: 'ember-changeset-webforms/cloned-form-fields/validating-form-field-clone-group'
      },
      textarea:         {
        componentPath: 'ember-changeset-webforms/fields/textarea'
      },
      powerSelect:      {
        componentPath: 'ember-changeset-webforms/fields/power-select'
      },
      powerDatePicker:  {
        componentPath: 'ember-changeset-webforms/fields/power-datepicker'
      },
      singleCheckbox:   {
        componentPath: 'ember-changeset-webforms/fields/checkbox'
      },
      radioButtonGroup: {
        componentPath: 'ember-changeset-webforms/fields/radio-button-group'
      },
      checkboxGroup:    {
        componentPath: 'ember-changeset-webforms/fields/checkbox-group',
      },
      dateRange:        {
        componentPath: 'ember-changeset-webforms/fields/date-range'
      },
      tagSelector:      {
        componentPath: 'ember-changeset-webforms/fields/tag-selector'
      },
      button:           {
        componentPath: 'ember-changeset-webforms/fields/button',
        castOut: true
      },
      staticContent:    {
        componentPath: 'ember-changeset-webforms/fields/static-content',
        castOut: true
      }
    };
  }
});