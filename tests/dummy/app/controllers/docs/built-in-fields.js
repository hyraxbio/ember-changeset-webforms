import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
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
    // BEGIN-SNIPPET radio-button-group-example-1.js
    this.radioButtonGroupExample1FormSchema = {
      settings: {
        formName: 'radioButtonGroupExample1',
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
        formName: 'radioButtonGroupExample2',
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
        formName: 'checkboxGroupExample1',
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
        formName: 'checkboxGroupExample2',
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
        formName: 'powerSelectExample1',
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
        formName: 'powerSelectExample2',
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
        formName: 'powerSelectExample3',
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

    // BEGIN-SNIPPET power-select-multiple-example-1.js
    this.powerSelectMultipleExample1FormSchema = {
      settings: {
        formName: 'powerSelectMultipleExample1',
        hideSubmitButton: true,
      },
      fields: [{
        searchEnabled: true,
        fieldId: 'country',
        fieldType: 'powerSelect',
        multipleSelection: true,
        allowFreeTyping: true,
        fieldLabel: 'Select countries',
        options: ['ABW', 'AFG', 'AGO', 'ALB', 'AND']
      }]
    }
    // END-SNIPPET

    // BEGIN-SNIPPET input-example-1.js
    this.inputExample1FormSchema = {
      settings: {
        formName: 'inputExample1',
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
        formName: 'inputExample2',
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
        formName: 'textareaExample1',
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
    // BEGIN-SNIPPET single-checkbox-example-1.js
    this.singleCheckboxExample1FormSchema = {
      settings: {
        formName: 'singleCheckboxExample1',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'acceptTerms',
        fieldType: 'singleCheckbox',
        checkBoxLabel: 'I agree to the terms and conditions',
      }]
    }
    // END-SNIPPET
    
    // BEGIN-SNIPPET single-checkbox-example-2.js
    this.singleCheckboxExample2FormSchema = {
      settings: {
        formName: 'singleCheckboxExample2',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'acceptTerms',
        fieldType: 'singleCheckbox',
        checkBoxLabelMarkdown: 'I agree to the __**[terms and conditions here](https://example.com)**__.'
      }]
    }
    // END-SNIPPET

    // BEGIN-SNIPPET single-checkbox-example-3.js
    this.singleCheckboxExample3FormSchema = {
      settings: {
        formName: 'singleCheckboxExample3',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'acceptTerms',
        fieldType: 'singleCheckbox',
        checkBoxLabelComponent: {
          path: 'forms/component-for-single-checkbox-option',
          props: {
            info: 'Some additional info'
          }
        },
      }]
    }
    // END-SNIPPET

    // BEGIN-SNIPPET static-content-example-1.js
    this.staticContentExample1FormSchema = {
      settings: {
        formName: 'staticContentExample1',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'staticContent',
        fieldType: 'staticContent',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero similique, repellat fuga ad enim eveniet exercitationem earum et commodi necessitatibus doloremque saepe veniam consequuntur maxime a soluta ea perferendis sit.',
        textElement: 'p',
      }]
    }
    // END-SNIPPET

    // BEGIN-SNIPPET static-content-example-2.js
    this.staticContentExample2FormSchema = {
      settings: {
        formName: 'staticContentExample2',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'staticContent',
        fieldType: 'staticContent',
        contentComponent: {
          path: 'forms/component-for-single-checkbox-option',
          props: {
            info: 'Some additional info'
          }
        },
      }]
    }
    // END-SNIPPET

    // BEGIN-SNIPPET power-datepicker-example-1.js
    this.powerDatapickerExample1FormSchema = {
      settings: {
        formName: 'powerDatapickerExample1',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD',
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-datepicker-example-1b.js
    this.powerDatapickerExample1bFormSchema = {
      settings: {
        formName: 'powerDatapickerExample1b',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        fixedTime: '23:59:59.999',
        dateTimeDisplayFormat: 'YYYY-MM-DD'
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-datepicker-example-1c.js
    this.powerDatapickerExample1cFormSchema = {
      settings: {
        formName: 'powerDatapickerExample1c',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD',
        minDate: '2022-11-10',
        maxDate: '2022-11-16'
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-datepicker-example-1d.js
    this.powerDatapickerExample1dFormSchema = {
      settings: {
        formName: 'powerDatapickerExample1d',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        dateTimeDisplayFormat: 'YYYY-MM-DD',
        minDate: '2022-11-10',
        maxDate: '2022-11-16'
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-datepicker-example-2.js
     this.powerDatapickerExample2FormSchema = {
      settings: {
        formName: 'powerDatapickerExample2',
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
        formName: 'powerDatapickerExample3',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        defaultValue: moment('2022-11-03 14:42:19.23456', 'YYYY-MM-DD HH:mm:ss.SSS')
      }]
    }
    // END-SNIPPET

    // BEGIN-SNIPPET power-datepicker-example-3a.js
    this.powerDatapickerExample3aFormSchema = {
      settings: {
        formName: 'powerDatapickerExample3a',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        timeSelectorFields: 'HH,mm',
        defaultValue: moment('2022-11-03 14:42', 'YYYY-MM-DD HH:mm')
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-datepicker-example-4.js
    this.powerDatapickerExample4FormSchema = {
      settings: {
        formName: 'powerDatapickerExample4',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD h:mm:ss a',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        timeSelectorFields: 'h,mm,ss',
        defaultValue: moment('2022-11-03 14:42:19 p', 'YYYY-MM-DD h:mm:ss a')
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET power-datepicker-example-5.js
    this.powerDatapickerExample5FormSchema = {
      settings: {
        formName: 'powerDatapickerExample5',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'HH:mm:ss.SSSSS DD.MM.YYYY',
        dateTimeDisplayFormat: 'DD/MM/YYYY HH:mm:ss.SSSS',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        timeSelectorFields: 'HH,mm,ss,SS',
        defaultValue: moment('14:42:19.14223 03.11.2022', 'HH:mm:ss.SSSSS DD.MM.YYYY')
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET clicker-example-1.js
    this.clickerExample1FormSchema = {
      settings: {
        formName: 'clickerExample1',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'toggleAdvanced',
        fieldType: 'clicker',
        clickerElementClassNames: ['...defaults', 'btn', 'btn-primary'],
        clickerText: 'Advanced options'
      }, {
        fieldId: 'advanced',
        fieldType: 'input',
        fieldLabel: 'Advanced setting',
        hidden: true,
        advancedSetting: true
      }]
    }
    // END-SNIPPET
    // BEGIN-SNIPPET clicker-example-2.js
    this.clickerExample2FormSchema = {
      settings: {
        formName: 'clickerExample2',
        hideSubmitButton: true,
      },
      fields: [{
        fieldId: 'toggleAdvanced',
        fieldType: 'clicker',
        clickerElementClassNames: ['...defaults', 'btn'],
        clickerText: 'Advanced options',
        displayComponent: {
          path: 'forms/custom-clicker-component',
          props: {
            buttonType: 'danger'
          }
        }
      }, {
        fieldId: 'advanced',
        fieldType: 'input',
        fieldLabel: 'Advanced setting',
        hidden: true,
        advancedSetting: true
      }]
    }
    // END-SNIPPET
  },
  actions: {
    // BEGIN-SNIPPET after-datetime-updated-action.js
    afterDatetimeUpdated(prop, formField, ChangesetWebform) {
      const dateTime = ChangesetWebform.changeset.get('startDate');
      this.set(`dateTimeOutput${prop}`, {
        nativeJSFormat: moment(dateTime, formField.dateTimeFormat).toDate(),
        fieldValue: dateTime
      })
    },
    // END-SNIPPET
    onUserInteraction(...args) {
      console.log(args);

    },
    // BEGIN-SNIPPET clicker-example-action.js
    onUserInteractionClicker1(formField, changesetWebform, eventType) {
      if (formField.fieldId === 'toggleAdvanced' && eventType === 'click') {
        formField.toggleProperty('showAdvanced');
        const advancedFields = changesetWebform.fields.filterBy('advancedSetting', true);
        advancedFields.forEach(field => field.toggleProperty('hidden'));
      }
    }
    // END-SNIPPET
  }
})