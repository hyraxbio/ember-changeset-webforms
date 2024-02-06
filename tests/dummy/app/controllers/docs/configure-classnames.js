import Controller from '@ember/controller';
import { addonDefaults } from 'ember-changeset-webforms/utils/get-with-default';

export default class ConfigureClassnames extends Controller {
  fieldTypes = addonDefaults.fieldTypes.map((item) => item.fieldType);

  // BEGIN-SNIPPET app-wide-class-settings.js"
  appWideClassesFormSchema = {
    formSettings: {
      formName: 'appClassNames',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
      {
        fieldId: 'radioButtons1',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Basic usage',
        options: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
      },
    ],
  };
  // END-SNIPPET

  // BEGIN-SNIPPET form-wide-class-settings.js"
  formWideClassesFormSchema = {
    formSettings: {
      formName: 'formClassNames',
      hideSubmitButton: true,
    },
    generalClassNames: {
      labelElement: ['$inherited', 'form-wide-label-class'],
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
      {
        fieldId: 'radioButtons1',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Basic usage',
        options: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
      },
    ],
  };
  // END-SNIPPET

  // BEGIN-SNIPPET field-specific-class-settings.js"
  fieldSpecificClassesFormSchema = {
    formSettings: {
      formName: 'fieldClassNames',
      hideSubmitButton: true,
    },
    generalClassNames: {
      labelElement: ['$inherited', 'form-wide-label-class'],
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
      {
        fieldId: 'radioButtons1',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Basic usage',
        classNames: {
          labelElement: ['$inherited', 'field-specific-class-names'],
        },
        options: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
      },
    ],
  };
  // END-SNIPPET

  // BEGIN-SNIPPET inherit-class-settings.js"
  inheritClassesFormSchema = {
    formSettings: {
      formName: 'inheritClassNames',
      hideSubmitButton: true,
    },
    generalClassNames: {
      labelElement: ['$inherited', 'form-wide-label-class'],
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
    ],
  };
  // END-SNIPPET

  // BEGIN-SNIPPET override-class-settings.js"
  overrideClassesFormSchema = {
    formSettings: {
      formName: 'overrideClassNames',
      hideSubmitButton: true,
    },
    generalClassNames: {
      labelElement: ['form-wide-label-class'],
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
    ],
  };
  // END-SNIPPET

  // BEGIN-SNIPPET validation-class-settings.js"
  validationClassesFormSchema = {
    formSettings: {
      formName: 'validationClassNames',
      hideSubmitButton: true,
    },
    generalClassNames: {
      labelElement: ['$validationClassNames'],
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
        validationEvents: ['keyUp'],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
