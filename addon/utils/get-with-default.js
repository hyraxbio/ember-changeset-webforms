import config from 'ember-get-config';
import _merge from 'lodash/merge';

const addonDefaults = {
  formSettings: {
    clearFormButtonText: 'Cancel',
    formName: 'changePasswordForm',
    hideSubmitButton: null,  // Boolean - hides the submit button if true
    submitButtonText: 'Submit', // String - text to show on the submit form button
    showResetButton: null, // Boolean - whether or not to show the reset form button
    resetAfterSubmit: null, // Boolean - reset all fields to their defaults after a the form submitAction returns successfully
    resetButtonText: 'Reset', // String - text to show on the reset form button
    showClearFormButton: null, // Boolean - whether or not to show the button that will empty all fields TODO check if this works
    showClearFormButtonText: 'Clear', // String - text to show on the clear form button TODO implement
    novalidate: true, // Disable the browser's native validation feedback
    submitButtonClasses: null, // String - classes to show on the form submit button
    submitButtonIcon: 'ember-changeset-webforms/form-elements/submit-button-icon', // String - path to the component icon to show on the submit form button
    submitButtonIconClassNames: null, // String - classes to all to the submitButtonIcon component, 
    submitButtonIconRequestInFlightClassNames: 'on', // TODO deprecate
    requestInFlightClasses: {
      form: 'saving',
      submitButton: 'saving',
      submitButtonIcon: 'saving'
    }, // Object - class to add to each of the three above elements which a form submit operation is ion flight. The class os removed after the submit action resolves or rejects if a promise, or returns if not. TODO impelent
    resetButtonClasses: null, // String = classes to show on the rest button
    submitSuccessMessage: 'Your password was successfully updated.', // Custom
    modelName: 'user', // Custom
    recordToUpdate: 'session.organisation', // TODO check this is killed
    submitAsync: true, // TODO check this is killed
  },
  fieldSettings: { // TODO document that these can all be included in a form in "fieldDefaults"
    fieldId: null,
    propertyName: null, // Optional, defaults to the value oif fieldId if not set.
    name: null, // String - defaults to the fieldId
    validationRules: [], // Array of objects
    validationEvents: [], // Array of strings, possible values include focusOut, keyUp, onChange // TODO check onChanger as validation event
    alwaysValidateOn: ['focusOut', 'change', 'submit', 'removeClone'], // Array of strings, possible values include focusOut, keyUp, onChange // TODO check onChange as validation event
    eventLog: [],
    hideSuccessValidation: null, // Boolean - only show validation colours when field validation fails
    hidden: null, // Boolean - if true, the field is hidden and also ignored when validating or submitting the form
    fieldClasses: null, // String
    castOut: null, // Boolean - exclude the field from validation and submission
    defaultValue: null, // Any - auto fill the field with this value when inserted. 
    fieldLabel: null, // String - the label to show on the field
    labelComponent: null, // String - path to a component to use as the label. If set, takes the place of fieldLabel 
    hideLabel: null, // Hide the label from the user
    disabled: null, // Boolean - disable the field, but do not hide it. It will still be validated [TODO check] and included when the form is submitted
    showfieldLabel: null, // Kill
    fieldLabelClassNames: null,
    fieldControlsClassNames: null
  },
  fieldTypes: [
    {
      fieldType: 'input',
      componentPath: 'ember-changeset-webforms/fields/input',
      inputType: 'text', // String - the html input type
      autofocus: null, // Boolean - whether to autofocus the input on insert 
      placeholder: null, // String - placeholder text of the input
      class: null, // TODO does this work?
      trim: true
    },
    {
      fieldType: 'clone-group',
      fieldLabelClassNames: 'clone-group-validation-icon',
      componentPath: 'ember-changeset-webforms/cloned-form-fields/validating-form-field-clone-group',
      maxClonesReachedText: 'Max clones reached.', // String
      removeCloneComponent: 'svg-repo/icons/icon-trash', // String - path to the component to use as the remove clone element
      addCloneButtonComponent: 'ember-changeset-webforms/cloned-field-elements/add-clone-button', // String - path to the component to use as the add clone element
      hideSuccessValidation: true,
      minClones: 1, // Number - minimum number of clones allowed. 
      maxClones: null, // Number - maximum number of clones allowed. 
      cloneButtonText: 'Add another item', // String - text to show in the add clone button
      cloneFieldSchema: {}, // Object - the field definition of the clones, defined in the same way that you would define the field as a one off field.
    },
    {
      fieldType: 'textarea',
      componentPath: 'ember-changeset-webforms/fields/textarea',
      autofocus: null, // Boolean - whether to autofocus the input on insert 
    },
    {
      fieldType: 'powerSelect',
      componentPath: 'ember-changeset-webforms/fields/power-select',
      placeholder: null, // String
      allowClear: null, // Boolean
      searchEnabled: true, // Boolean
      options: [],
      optionDisplayProp: null, // String - if options is an array of objects, provide the key to show in the list
      fieldLabelClassNames: null // Array of classnames TODO check this
      
    },
    {
      fieldType: 'powerDatePicker',
      componentPath: 'ember-changeset-webforms/fields/power-datepicker',
      dateSelectComponent: null,
      dateFormat: 'YYYY-MM-DD', // String - date format to use
      timeFormat: 'HH:mm:ss', // String - time format to use
      defaultTime: '00:00:00', // String - default tme. Must be in the format provided by timeFormat.
      showTimeSelector: null, // Boolean - show the UI for the user to change the time.
      calendarContainerClasses: null, // String - classes to apply to the calendar component,
      closeDatePickerOnSelect: true,
      dateRangeSettings: {
        rangePosition: 'start',
        rangePartnerFieldId: 'inserted_to'
      }
    },
    {
      fieldType: 'singleCheckbox',
      componentPath: 'ember-changeset-webforms/fields/checkbox',
      checkBoxLabelComponent: null // String - path to the component to use as the checkbox label
    },
    {
      fieldType: 'radioButtonGroup',
      componentPath: 'ember-changeset-webforms/fields/radio-button-group',
      options: [], // Array. Included items can be of any type, but must all be of the same type
      // TODO check optionDisplayProp
    },
    {
      fieldType: 'checkboxGroup',
      componentPath: 'ember-changeset-webforms/fields/checkbox-group',
      options: [], // Array. Included items can be of any type, but must all be of the same type
      fieldClassNames: [] // Array of strings to apply to the field TODO check this
    },
    {
      fieldType: 'dateRange',
      componentPath: 'ember-changeset-webforms/fields/date-range',
      triggerClasses: null, // String - classes to apply to the dropdown trigger element
      calendarContainerClasses: null, // String - classes to apply to the calendar element that drops down then the trigger is clicked
      minDate: null, // String in format 2021-06-01T12:19:39.174Z TODO check this exists
      maxDate:  null, // String in format 2021-06-01T12:19:39.174Z
      startTime: null, // String in format 00:01
      endTime: null, // String in format 23:59
    },
    {
      fieldType: 'tagSelector',
      componentPath: 'ember-changeset-webforms/fields/tag-selector'
    },
    {
      fieldType: 'clicker',
      componentPath: 'ember-changeset-webforms/fields/clicker',
      clickerText: null, // String - text to display in the clicker element.
      displayComponent: null, // String - path to the component

    },
    {
      fieldType: 'staticContent',
      componentPath: 'ember-changeset-webforms/fields/static-content',
      text: null,
      textElement: 'h3 ', // TODO check this
      contentComponent: {
        path: null, // String - path to the component to display
        props: null // Object - properties to be passed to the component above.
      }
    }
  ],
};

export default function getWithDefault(formSchema = {}) {
  const appDefaults = config.changesetWebformsDefaults || {};
  const formSettings = _merge(addonDefaults.formSettings, appDefaults.formSettings, formSchema.formSettings);
  const addonFieldDefaults = addonDefaults.fieldSettings || {};
  const appConfigFieldDefaults = appDefaults.fieldSettings || {};
  const mergedFields = (formSchema.fields || []).map(field => {
    let mergedField = {};
    const addonFieldTypeDefaults = addonDefaults.fieldTypes.find(addonFieldType => addonFieldType.fieldType === field.fieldType);
    const appConfigFieldTypeDefaults = (appDefaults.fieldTypes || []).find(appConfigFieldType => appConfigFieldType.fieldType === field.fieldType);
    const formSettingsFieldDefaults = formSchema.fieldSettings || {};

    mergedField = {..._merge(mergedField, addonFieldDefaults, addonFieldTypeDefaults, appConfigFieldDefaults, appConfigFieldTypeDefaults, formSettingsFieldDefaults, field)};
    if (field.cloneFieldSchema) {
      let mergedCloneField = {};
      const cloneAddonFieldTypeDefaults = addonDefaults.fieldTypes.find(addonFieldType => addonFieldType.fieldType === field.cloneFieldSchema.fieldType);
      const appConfigCloneFieldTypeDefaults = (appDefaults.fieldTypes || []).find(appConfigFieldType => appConfigFieldType.fieldType === field.cloneFieldSchema.fieldType);
      mergedCloneField = {..._merge(mergedCloneField, addonFieldDefaults, cloneAddonFieldTypeDefaults, appConfigFieldDefaults, appConfigCloneFieldTypeDefaults, formSettingsFieldDefaults, field.cloneFieldSchema)};
      mergedField.cloneFieldSchema = mergedCloneField;
    }
    return mergedField;
  });
  return {
    formSettings: formSettings,
    fields: mergedFields
  };
}