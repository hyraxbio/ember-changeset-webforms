import Component from '@ember/component';
import layout from '../templates/components/signup-form';
import { inject as service } from '@ember/service';
import Changeset from 'ember-changeset';
import EmberObject from '@ember/object';

export default Component.extend({
  layout,
  globalVariables: service(),
  init() {
    this._super(...arguments);
    this.formSchema = {
      title: 'Sign Up',
      formName: 'signup',
      submitButtonClasses: 'btn btn-primary btn-lg btn-block',
      submitSuccessMessage: 'You have successfully signed up.',
      submitButtonText: 'Signup',
      modelName: 'user',
      resetAfterSubmit: true,
      fields: [{
          fieldLabel: 'Name',
          fieldId: 'name',
          fieldType: 'input',
          validationRules: [{'validationMethod': 'required'}],
          inputType: 'text'
        },
        {
          fieldLabel: 'Email',
          fieldId: 'email',
          fieldType: 'input',
          validationRules: [{'validationMethod': 'required'}, {'validationMethod': 'isEmail'}],
          inputType: 'text'
        },
        {
          fieldLabel: 'Phone number',
          fieldId: 'info.phone_number',
          fieldType: 'input',
          validationRules: [{'validationMethod': 'required'}],
          inputType: 'number'
        },
        {
          fieldLabel: 'Country',
          fieldId: 'info.address.country',
          fieldType: 'powerSelect',
          validationRules: [{'validationMethod': 'required'}],
          options: this.get('globalVariables.countries')
        },
        {
          fieldId: 'password',
          fieldLabel: 'Password (Minimum 8 characters)',
          fieldType: 'input',
          showfieldLabel: false,
          validationRules: [{
            'validationMethod': 'required'
          }, {
            'validationMethod': 'isLength',
            'arguments': {
              min: 8,
              max: 72
            }
          }, {
            'validationMethod': 'custom'
          }],
          inputType: 'password'
        },
        {
          fieldId: 'password_confirmation',
          fieldLabel: 'Confirm password',
          fieldType: 'input',
          showfieldLabel: false,
          validationRules: [{
            'validationMethod': 'required'
          }, {
            'validationMethod': 'isLength',
            'arguments': {
              min: 8,
              max: 72
            }
          }, {
            'validationMethod': 'custom'
          }],
          inputType: 'password'
        },
        {
          fieldLabel: 'Description',
          fieldId: 'description',
          fieldType: 'textarea',
        },
        {
          fieldLabel: 'Birth date',
          fieldId: 'info.birth_date',
          fieldType: 'powerDatePicker',
          defaultValue: moment().toDate(),
          validationRules: [{'validationMethod': 'required'}, {'validationMethod': 'isDate'}],
          triggerClasses: 'btn btn-gray-medium'
        },
        {
          fieldLabel: 'Date range',
          fieldType: 'dateRange',
          fieldSubIds: [{
            id: '_from',
            valueKey: 'start'
          }, {
            id: '_to',
            valueKey: 'end'
          }],
          triggerClasses: 'btn btn-primary',
          calendarContainerClasses: 'pop-up-box box-arrow',
          maxDate: '2019-08-23T08:50:10.900Z',
          startTime: '00:01',
          endTime: '23:59',
          fieldId: 'inserted'
        },
        {
          fieldLabel: "favourite colours",
          fieldId: "favoutite_colours",
          fieldType: "tagSelector",
          options: ['red', 'orange'],
        },
        {
          fieldId: 'toggleAdvanced',
          fieldType: 'button',
          buttonClasses: 'btn btn-primary',
          buttonText: 'Advanced search',
          fieldClass: 'flex-expand',
        },
        {
          fieldId: 'currentPasswordHeader',
          fieldType: 'staticContent',
          text: 'Current Password',
          textElement: 'h3'
        },
        {
          fieldId: 'gender',
          fieldType: 'radioButtonGroup',
          fieldLabel: 'Gender',
          validationRules: [{
            'validationMethod': 'required'
          }],
          options: [{
            'label': 'Male',
            'value': 'male'
          }, {
            'label': 'Female',
            'value': 'female'
          }, {
            'label': 'Other',
            'value': 'other'
          }],
        },
        {
          fieldLabel: 'Type your gender',
          fieldId: 'other_gender',
          fieldType: 'input',
          inputType: 'text',
          hidden: true
        },
        {
          fieldId: 'accept_terms',
          fieldType: 'singleCheckbox',
          labelComponent: 'field-labels/signup-accept-terms',
          defaultValue: true
        },
      ]
    };
  },

  didInsertElement() {
    var user = EmberObject.create({
      firstName: 'Michael',
      lastName: 'Bolton'
    });
    let changeset = new Changeset(user);
    console.log(changeset);
    user.get('firstName'); // "Michael"
    user.get('lastName'); // "Bolton"
    
    changeset.set('firstName', 'Jim');
    changeset.set('lastName', 'B');
    changeset.get('isInvalid'); // true
    changeset.get('errors'); // [{ key: 'lastName', validation: 'too short', value: 'B' }]
    changeset.set('lastName', 'Bob');
    changeset.get('isValid'); // true
    
    user.get('firstName'); // "Michael"
    user.get('lastName'); // "Bolton"
    console.log(user);
    changeset.save(); // sets and saves valid changes on the user
    user.get('firstName'); // "Jim"
    user.get('lastName'); // "Bob"
    console.log(user);
  }
});
