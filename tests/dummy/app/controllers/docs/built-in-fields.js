import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.fields = [{
      fieldType: 'input',
      inputType: 'text', // String - any valid html input type
      placeholder: 'First name', // String - optional. Defaults to label if not present.
      autofocus: true
    },
    { fieldType: 'radioButtonGroup', options: [] },
    {
      fieldType: 'powerSelect',
      placeholder: 'Select',
      searchEnabled: true,
      allowClear: false,
      options: [],
      optionDisplayProp: 'name',
      selectedItemComponent: 'hyrax-ember-assets/janus/forms/shared-fields/country-field-selected-item',
      optionComponent: 'hyrax-ember-assets/janus/forms/shared-fields/country-field-option'
    },
    { fieldType: 'clicker' },
    {
      fieldType: 'powerDatePicker',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: 'HH:mm:ss',
      defaultTime: '23:59:59',
      calendarContainerClasses: 'pop-up-box box-arrow',
      closeDatePickerOnSelect: true,
      dateRangeSettings: { rangePosition: 'end', rangePartnerFieldId: 'inserted_from' }
    },
    {
      fieldType: 'singleCheckbox',
      checkBoxLabel: 'Generate BAM files (Note that BAM files are large and may slow the job down)',
      label: 'I agree that my uploaded data can be used anonymously for research purposes other than surveillance. See our [privacy policy](https://exatype.com/privacy-policy) for further information.',
      checkBoxLabelMarkdown: 'I agree that my uploaded data can be used anonymously for research purposes other than surveillance. See our [privacy policy](https://exatype.com/privacy-policy) for further information.'
    },
    {
      fieldType: 'staticContent',
      text: 'andrew+no-org@hyraxbio.com',
      textElement: 'div',
      textElementClass: 'badge badge-gray-medium',
      contentComponent: {
        path: 'hyrax-ember-assets/exatype/surveillance-research-data-consent-revoked-notice',
        props: [Object]
      }
    },
    { fieldType: 'noDisplay' },
    { fieldType: 'checkboxGroup', placeholder: 'Select', options: [] }
    ]
    // this.allFieldsInOne = 
    // this.combined = {
    //   settings: {
    //     formName: 'signUpForm',
    //     showResetButton: false,
    //     hideSubmitButton: true,
    //     resetAfterSubmit: true,
    //     submitAsync: true,
    //     submitButtonText: 'Create my Account',
    //     hideSuccessValidation: true,
    //     submitButtonClasses: 'btn btn-primary btn-lg btn-block',
    //     submitSuccessMessage: 'Your sign up request has been received. Please check your email for a confirmation link.',
    //     title: 'Edit Account',
    //     modelName: 'user',
    //     hideLabels: true
    //   },

    // }
    this.radioButtonGroupOption = {
      // BEGIN-SNIPPET radio-button-group-option.js
      value: null, // 
      // Either one of labelComponent or label must be passed.
      label: null, // String to display as the label of the option.
      labelComponent: null, // Optional. Component to replace the standard label element for a single option. 
      // END-SNIPPET
    };

    this.checkboxGroupOption = {
      // BEGIN-SNIPPET checkbox-group-option.js
        key: null,
        // Either one of labelComponent or label must be passed.
        label: null, // String to display as the label of the option.
        labelComponent: null, // Optional. Component to replace the standard label element for a single option
      // END-SNIPPET
    },

    this.testFormSchema = {
      settings: {
        formName: 'signUpForm',
        submitButtonText: 'Create my Account',
      },
      fieldSettings: {
        // hideLabel: true,
      },
      fields: [{
        fieldId: 'name',
        fieldLabel: 'Name',
        fieldType: 'input',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }],
        inputType: 'text'
      }, {
        fieldId: 'email',
        fieldLabel: 'Email',
        fieldType: 'input',
        validationEvents: ['insert'],
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }, {
          validationMethod: 'validateFormat',
          arguments: { type: 'email' }
        }],
        inputType: 'email'
      }, {
        fieldId: 'birthDate',
        fieldLabel: 'Date of birth',
        fieldType: 'powerDatePicker',
        calendarContainerClasses: 'pop-up-box box-arrow', // TODO default app settings
        closeDatePickerOnSelect: true,
      }, {
        fieldId: 'password',
        fieldLabel: 'Password (Minimum 8 characters)',
        fieldType: 'input',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }, {
          validationMethod: 'validateLength',
          arguments: { min: 8, max: 72 }
        }],
        inputType: 'password'
      },
      {
        fieldId: 'password_confirmation',
        fieldLabel: 'Confirm password',
        fieldType: 'input',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }, {
          validationMethod: 'validateLength',
          arguments: { min: 8, max: 72 }
        }, {
          validationMethod: 'validateConfirmation',
          arguments: { on: 'password' }
        }],
        inputType: 'password'
      },
      {
        fieldId: 'details.country',
        fieldLabel: 'Country',
        fieldType: 'powerSelect',
        placeholder: 'Select',
        searchEnabled: true,
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: {presence: true, description: 'Country'}
        }],
        options: this.get('globalVariables.countries'),
      },
      
      {
        fieldId: 'mailSubscriptions',
        dataTestFieldName: 'assay',
        fieldLabel: 'Which HIV kit/s do you use?',
        fieldType: 'checkboxGroup',
        placeholder: 'Select',
        hidden: true,
        showfieldLabel: false,
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
            message: 'Please select at least one of the options above.'
          }
        }],
        options: [{
          'key': 'A32317/A32318 (RUO) ABI HIV-1 Genotyping Kit Amplification and Sequencing Modules',
          'label': 'A32317/A32318 (RUO) ABI HIV-1 Genotyping Kit Amplification and Sequencing Modules'
        }, {
          'key': 'A55120 (RUO) ABI HIV-1 Genotyping Kit with Integrase',
          'label': 'A55120 (RUO) ABI HIV-1 Genotyping Kit with Integrase'
        }, {
          'key': 'A54401 (CE-IVDD) ABI TaqPath Seq HIV-1 Genotyping Kit',
          'label': 'A54401 (CE-IVDD) ABI TaqPath Seq HIV-1 Genotyping Kit'
        }, {
          'key': 'Other',
          'label': 'Other'
        }]
      },
      {
        fieldId: 'preferences.surveillance',
        fieldType: 'singleCheckbox',
        checkBoxLabel: 'Allow my data to be used to be collected.',
        defaultValue: false,
      }]
    };
    // BEGIN-SNIPPET radio-button-group-example-1.js
    this.radioButtonGroupExample1FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'radioButtons1',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Basic usage',
        options: [{
          label: 'Option 1',
          value: '1',
        }, {
          label: 'Option 2',
          value: '2',
        }, {
          label: 'Option 3',
          value: '3',
        }]
      }]
    }
    // END-SNIPPET

    //BEGIN-SNIPPET radio-button-group-example-2.js
    this.radioButtonGroupExample2FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'radioButtons2',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Custom label components',
        optionLabelComponent: {
          path: 'forms/component-for-all-radio-options',
          props: {
            infoLink: 'https://example.com'
          }
        },
        options: [{
          label: 'Option 1',
          value: '1',
          
        }, {
          label: 'Option 2',
          value: '2',
          
        }, {
          label: 'Option 3',
          value: '3',
          labelComponent: {
            path: 'forms/component-for-single-radio-option',
            props: {
              info: 'Some additional info'
            }
          },
        }]
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET checkbox-group-example-1.js
    this.checkboxGroupExample1FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'checkboxes1',
        fieldType: 'checkboxGroup',
        fieldLabel: 'Basic usage',
        options: [{
          label: 'Option 1',
          key: '1',
        }, {
          label: 'Option 2',
          key: '2',
        }, {
          label: 'Option 3',
          key: '3',
        }]
      }]
    }
    // END-SNIPPET

    //BEGIN-SNIPPET checkbox-group-example-2.js
    this.checkboxGroupExample2FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'checkboxes2',
        fieldType: 'checkboxGroup',
        fieldLabel: 'Custom label components',
        optionLabelComponent: {
          path: 'forms/component-for-all-checkbox-options',
          props: {
            infoLink: 'https://example.com'
          }
        },
        options: [{
          label: 'Option 1',
          key: '1',
          
        }, {
          label: 'Option 2',
          key: '2',
          
        }, {
          label: 'Option 3',
          key: '3',
          labelComponent: {
            path: 'forms/component-for-single-checkbox-option',
            props: {
              info: 'Some additional info'
            }
          },
        }]
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-select-example-1.js
    this.powerSelectExample1FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'country',
        fieldType: 'powerSelect',
        fieldLabel: 'Select country',
        placeholder: 'This is where the placeholder goes',
        searchPlaceholder: 'Custom placeholder for search box',
        allowClear: true,
        options: ['Aruba', 'Afghanistan', 'Angola', 'Albania', 'Andorra'],
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-select-example-2.js
    this.powerSelectExample2FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'country',
        fieldType: 'powerSelect',
        fieldLabel: 'Select country',
        optionDisplayProp: 'name',
        options: [{
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
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-select-example-3.js
    this.powerSelectExample3FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'country',
        fieldType: 'powerSelect',
        fieldLabel: 'Select country',
        optionComponent: 'forms/power-select-option-component',
        selectedItemComponent: 'forms/power-select-selected-item-component',
        options: ['ABW', 'AFG', 'AGO', 'ALB', 'AND']
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET input-example-1.js
    this.inputExample1FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET input-example-2.js
    this.inputExample2FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'password',
        fieldType: 'input',
        inputType: 'password',
        fieldLabel: 'Password',
        placeholder: 'Enter your password here'
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET textarea-example-1.js
    this.textareaExample1FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'description',
        fieldType: 'textarea',
        fieldLabel: 'Description',
        placeholder: 'Enter your description here'
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-datepicker-example-1.js
    this.powerDatapickerExample1FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'inserted_to',
        fieldLabel: 'Last day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        defaultTime: '23:59:59',
        calendarContainerClasses: 'pop-up-box box-arrow',
        closeDatePickerOnSelect: true,
        propertyName: 'inserted_to',
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-datepicker-example-2.js
     this.powerDatapickerExample2FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        closeDatePickerOnSelect: true,
        dateRangeSettings: {
          rangePosition: 'start',
          rangePartnerFieldId: 'endDate'
        },
      }, {
        fieldId: 'endDate',
        fieldLabel: 'Last day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        defaultTime: '23:59:59',
        closeDatePickerOnSelect: true,
        dateRangeSettings: {
          rangePosition: 'end',
          rangePartnerFieldId: 'startDate'
        },
      }]
    }
    // END-SNIPPET

    

    // BEGIN-SNIPPET power-datepicker-example-3.js
    this.powerDatapickerExample3FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        timeSelectorFields: ['HH', 'mm', 'ss', 'SSS'],
        defaultValue: moment('2022-11-03 14:42:19.23456', 'YYYY-MM-DD HH:mm:ss.SSS')
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-datepicker-example-4.js
    this.powerDatapickerExample4FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD h:mm:ss a',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        timeSelectorFields: ['h', 'mm', 'ss'],
        defaultValue: moment('2022-11-03 14:42:19 p', 'YYYY-MM-DD h:mm:ss a')
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-datepicker-example-5.js
    this.powerDatapickerExample5FormSchema = {
      settings: {
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'HH:mm:ss.SSSSS DD.MM.YYYY',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        timeSelectorFields: ['HH', 'mm', 'ss', 'SS'],
        defaultValue: moment('14:42:19.14223 03.11.2022', 'HH:mm:ss.SSSSS DD.MM.YYYY')
      }]
    }
    // END-SNIPPET
  },
  actions: {
    updateRawDateTime(prop, formField, ChangesetWebform, _snapshot) {
      const dateTimeFormat = formField.dateTimeFormat || 'YYYY-MM-DD h:mm:ss a';
      const dateTime = ChangesetWebform.changeset.get('startDate');
      this.set(prop, moment(dateTime, dateTimeFormat).toDate())
    }
  }
})