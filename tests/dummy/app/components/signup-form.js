import Component from '@ember/component';
import layout from '../templates/components/signup-form';
import { inject as service } from '@ember/service';
import customValidators from '../validators';

export default Component.extend({
  layout,
  globalVariables: service(),
  store: service(),

  init() {
    this._super(...arguments);
    this.customValidators = customValidators;
    this.formSchema = {
      settings: {
        title: 'Sign Up',
        formName: 'signup',
        submitButtonClasses: 'btn btn-primary btn-lg btn-block',
        submitSuccessMessage: 'You have successfully signed up.',
        submitButtonText: 'Signup',
        showResetButton: true,
        modelName: 'user',
        resetAfterSubmit: true,
      },     
      fields: [
        {
          fieldLabel: 'Name',
          fieldId: 'name',
          fieldType: 'input',
          validationRules: [{
            validationMethod: 'validatePresence',
            arguments: true
          }],
          validationEvents: ['keyUp'],
          inputType: 'text',
          defaultValue: 'test'
        },
        {
          fieldLabel: 'Email',
          fieldId: 'email',
          fieldType: 'input',
          validationRules: [{
            validationMethod: 'validatePresence',
            arguments: true
          }, {
            validationMethod: 'validateFormat',
            arguments: { type: 'email' }
          }],
          // validationEvents: ['keyUp'],
          inputType: 'text'
        },
        // {
        //   fieldLabel: 'Phone number',
        //   fieldId: 'info.phone_number',
        //   fieldType: 'input',
        //   validationRules: [{
        //     validationMethod: 'validatePresence',
        //     arguments: true
        //   }],
        //   inputType: 'text',
        //   defaultValue: 555
        // },
        {
          fieldLabel: 'Country',
          fieldId: 'info.address.country',
          fieldType: 'powerSelect',
          validationRules: [{
            validationMethod: 'validatePresence',
            arguments: true
          }],
          options: this.get('globalVariables.countries')
        },
        // {
        //   fieldId: 'password',
        //   fieldLabel: 'Password (Minimum 8 characters)',
        //   fieldType: 'input',
        //   showfieldLabel: false,
        //   validationRules: [{
        //     validationMethod: 'validatePresence',
        //     arguments: true
        //   }, {
        //     validationMethod: 'validateLength',
        //     arguments: { min: 8, max: 72 }
        //   }],
        //   inputType: 'password'
        // },
        // {
        //   fieldId: 'password_confirmation',
        //   fieldLabel: 'Confirm password',
        //   fieldType: 'input',
        //   showfieldLabel: false,
        //   validationRules: [{
        //     validationMethod: 'validatePresence',
        //     arguments: true
        //   }, {
        //     validationMethod: 'validateLength',
        //     arguments: { min: 8, max: 72 }
        //   }, {
        //     validationMethod: 'validateConfirmation',
        //     arguments: { on: 'password'}
        //   }],
        //   inputType: 'password'
        // },
        // {
        //   fieldLabel: 'Bio',
        //   fieldId: 'bio',
        //   fieldType: 'textarea',
        // },
        // {
        //   fieldLabel: 'Birth date',
        //   fieldId: 'info.birth_date',
        //   fieldType: 'powerDatePicker',
        //   validationRules: [{
        //     validationMethod: 'validatePresence',
        //     arguments: true
        //   }, {
        //     validationMethod: 'validateDate',
        //   }],
        //   triggerClasses: 'btn btn-gray-medium'
        // },
        // {
        //   fieldId: 'inserted',
        //   fieldLabel: 'Date range',
        //   fieldType: 'dateRange',
        //   fieldSubIds: [{
        //     id: '_from',
        //     valueKey: 'start'
        //   }, {
        //     id: '_to',
        //     valueKey: 'end'
        //   }],
        //   triggerClasses: 'btn btn-primary',
        //   calendarContainerClasses: 'pop-up-box box-arrow',
        //   maxDate: '2019-08-23T08:50:10.900Z',
        //   startTime: '00:01',
        //   endTime: '23:59',
        //   placeholder: 'Select date range'
        // },
        // {
        //   fieldLabel: "favourite colours",
        //   fieldId: "favourite_colours",
        //   fieldType: "tagSelector",
        //   options: ['red', 'orange'],
        //   // validationRules: [{
        //   //   validationMethod: 'validatePresence',
        //   //   arguments: true
        //   // }],
        // },
        // {
        //   fieldId: 'toggleAdvanced',
        //   fieldType: 'button',
        //   buttonClasses: 'btn btn-primary',
        //   buttonText: 'Advanced search',
        //   fieldClass: 'flex-expand',
        // },
        // {
        //   fieldId: 'currentPasswordHeader',
        //   fieldType: 'staticContent',
        //   text: 'Current Password',
        //   textElement: 'h3'
        // },
        // {
        //   fieldId: 'gender',
        //   fieldType: 'radioButtonGroup',
        //   fieldLabel: 'Gender',
        //   validationRules: [{
        //     validationMethod: 'validatePresence',
        //     arguments: true
        //   }],
        //   options: [{
        //     'label': 'Male',
        //     'value': 'male'
        //   }, {
        //     'label': 'Female',
        //     'value': 'female'
        //   }, {
        //     'label': 'Other',
        //     'value': 'other'
        //   }],
        //   defaultValue: 'male'
        // },
        // {
        //   fieldLabel: 'Type your gender',
        //   fieldId: 'other_gender',
        //   fieldType: 'input',
        //   inputType: 'text',
        //   hidden: true
        // },
        // {
        //   fieldId: 'diet',
        //   fieldType: 'checkboxGroup',
        //   fieldLabel: 'Diet',
        //   validationRules: [{
        //     validationMethod: 'validatePresence',
        //     arguments: true
        //   }],
        //   options: [{
        //     'label': 'Vegetables',
        //     'key': 'vegetables'
        //   }, {
        //     'label': 'Meat',
        //     'key': 'meat'
        //   }, {
        //     'label': 'Dairy',
        //     'key': 'dairy'
        //   }],
        //   defaultValue: ['dairy   '],
        //   preventEmpty: true,
        // },
        // {
        //   fieldLabel: 'Type your gender',
        //   fieldId: 'other_gender',
        //   fieldType: 'input',
        //   inputType: 'text',
        //   hidden: true
        // },
        // {
        //   fieldId: 'accept_terms',
        //   fieldType: 'singleCheckbox',
        //   labelComponent: 'field-labels/signup-accept-terms',
        //   defaultValue: true
        // },
      ]
    };
    this.fieldSchema = {
      // autofocus: true,
      fieldLabel: 'Name2',
      fieldId: 'name',
      fieldType: 'input',
      validationRules: [{
        validationMethod: 'validatePresence',
        arguments: true
      }, {
        validationMethod: 'validateFormat',
        arguments: { type: 'email' }
      }],
      validationEvents: ['keyUp'],
      inputType: 'text',
      defaultValue: ' Test '
    };
  },

  actions: {
    submit(changeset) {
      if (changeset.isInvalid) {
        // alert('no')
      } else {
        if (changeset.data.save) {
          changeset.save().then(response => {
            alert("Updated");
          });
        } else {
          var record = this.store.createRecord(this.get('modelName'), changeset.data);
          record.save().then(response => {
            alert("Saved");
          });
        }
      }
    }
  }
});
