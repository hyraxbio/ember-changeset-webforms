import config from 'ember-get-config';
import _merge from 'lodash/merge';

const addonDefaults = {
  formSettings: {
    // BEGIN-SNIPPET form-settings-options.js
    clearFormButtonText: 'Cancel', // String - text to show in the clear form button, if enabled.
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
    resetButtonClasses: null, // String - classes to show on the rest button
    submitAfterClear: null // Boolean. If true submits the form after the clear form button is clicked. An example use case is a filters form with a clear filters button, where the desired behaviour is to clear the form fields, and then submit the empty form to reset the filters
    // END-SNIPPET
  },
  fieldSettings: { // TODO document that these can all be included in a form in "fieldDefaults"
    fieldId: null,
    propertyName: null, // Optional, defaults to the value oif fieldId if not set.
    name: null, // String - defaults to the fieldId
    validationRules: [], // Array of objects
    validationEvents: [], // Array of strings, possible values include focusOut, keyUp, onChange // TODO check onChanger as validation event
    alwaysValidateOn: ['focusOut', 'change', 'submit', 'removeClone', 'optionSelected'], // Array of strings, possible values include focusOut, keyUp, onChange // TODO check onChange as validation event
    eventLog: [],
    hideSuccessValidation: null, // Boolean - only show validation colours when field validation fails
    hidden: null, // Boolean - if true, the field is hidden and also ignored when validating or submitting the form
    fieldClasses: null, // String
    castOut: null, // Boolean - exclude the field from validation and submission
    defaultValue: null, // Any - auto set the changeset property for the field to this value when the ChangesetWebform component is rendered and the changeset is created. This value will be overridden by a corresponding property in the data object that is passed to the ChangesetWebform component.  
    fieldLabel: null, // String - the label to show on the field
    labelComponent: null, // String - path to a component to use as the label. If set, takes the place of fieldLabel 
    hideLabel: null, // Hide the label from the user
    disabled: null, // Boolean - disable the field, but do not hide it. It will still be validated [TODO check] and included when the form is submitted
    fieldClassNames: null, // String. CSS classes to apply to the outer element of the field TODO check this
    fieldLabelClassNames: null,
    fieldControlsClassNames: null,
    validationAreaClassNames: 'test'

  },
  fieldTypes: [
    {
      // BEGIN-SNIPPET input-field-options.js
      fieldType: 'input',
      inputType: 'text', // String - the html input type
      autofocus: null, // Boolean - whether to autofocus the input on insert 
      placeholder: null, // String - placeholder text of the input
      class: null, // TODO does this work?
      trim: true,
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/input',

    },
    {
      // BEGIN-SNIPPET clone-group-field-options.js
      fieldType: 'clone-group',
      fieldLabelClassNames: 'clone-group-validation-icon',
      maxClonesReachedText: 'Max clones reached.', // String
      removeCloneComponent: 'svg-repo/icons/icon-trash', // String - path to the component to use as the remove clone element
      addCloneButtonComponent: 'ember-changeset-webforms/cloned-field-elements/add-clone-button', // String - path to the component to use as the add clone element
      hideSuccessValidation: true,
      minClones: 1, // Number - minimum number of clones allowed. 
      maxClones: null, // Number - maximum number of clones allowed. 
      cloneButtonText: null, // String - text to show in the add clone button. Defaults to `Add ${clonedField.fieldLabel} field`
      cloneFieldSchema: {}, // Object - the field definition of the clones, defined in the same way that you would define the field as a one off field.
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/cloned-form-fields/validating-form-field-clone-group',
    },
    {
      // BEGIN-SNIPPET textarea-field-options.js
      fieldType: 'textarea',
      autofocus: null, // Boolean - whether to autofocus the input on insert 
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/textarea',
    },
    {
      // BEGIN-SNIPPET powerSelect-field-options.js
      fieldType: 'powerSelect',
      allowClear: null, // Boolean. If true, the select box shows a clear icon which clears the value oif the field. See https://ember-power-select.com/docs/the-trigger for more.
      searchEnabled: true, // Boolean. If true, a search box will display at the top of the select options, and will filter the options list then the user types. See https://ember-power-select.com/docs/the-search for more.
      searchPlaceholder: 'Search', // String. If passed it will replace the default placeholder in the search box for the power select list.
      options: [], // Array of items. Items ban be of any type, but they must all be the same type. If an array of objects ios passed, then optionDisplayProp can be passed to determine which property in the object should be shown as the label of the option in the list.
      optionDisplayProp: null, // String - if options is an array of objects, provide the key to show in the list
      optionComponent: null,
      selectedItemComponent: null, // String - path to a component to replace what is displayed as the selected item.
      fieldLabelClassNames: null, // Array of classnames TODO check this
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/power-select',
      
    },
    {
      // BEGIN-SNIPPET powerDatePicker-field-options.js
      fieldType: 'powerDatePicker',
      dateSelectComponent: null,
      dateFormat: 'YYYY-MM-DD', // String - date format to use
      timeFormat: 'HH:mm:ss', // String - time format to use
      defaultTime: '00:00:00', // String - default time. Must be in the format provided by timeFormat.
      showTimeSelector: null, // Boolean - show the UI for the user to change the time.
      calendarContainerClasses: null, // String - classes to apply to the calendar component,
      closeDatePickerOnSelect: true,
      dateRangeSettings: null, 
      validationAreaClassNames: 'test',

      // {
      //   rangePosition: 'start',
      //   rangePartnerFieldId: 'inserted_to'
      // },
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/power-datepicker',
    },
    {
      // BEGIN-SNIPPET singleCheckbox-field-options.js
      fieldType: 'singleCheckbox',
      checkBoxLabelComponent: null, // String - path to the component to use as the checkbox label
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/checkbox',
    },
    {
      // BEGIN-SNIPPET radioButtonGroup-field-options.js
      fieldType: 'radioButtonGroup',
      options: [], // Array of objects.
      optionLabelComponent: null, // Optional. // Component to replace the standard label element for each option. 
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/radio-button-group',
    },
    {
      // BEGIN-SNIPPET checkboxGroup-field-options.js
      fieldType: 'checkboxGroup',
      options: [], // Array of objects.
      optionLabelComponent: null, // Optional. Can be used to override the default label component used to render the radio button options, which simply displays the label of each option. Can either be string which is the path to the component or an object with a property called path being the path to the component and props, an object which will be passed to the component as "props".
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/checkbox-group',
    },
    {
      // BEGIN-SNIPPET dateRange-field-options.js
      fieldType: 'dateRange',
      triggerClasses: null, // String - classes to apply to the dropdown trigger element
      calendarContainerClasses: null, // String - classes to apply to the calendar element that drops down then the trigger is clicked
      minDate: null, // String in format 2021-06-01T12:19:39.174Z TODO check this exists
      maxDate:  null, // String in format 2021-06-01T12:19:39.174Z
      startTime: null, // String in format 00:01
      endTime: null, // String in format 23:59
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/date-range',
    },
    {
      // BEGIN-SNIPPET tagSelector-field-options.js
      fieldType: 'tagSelector',
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/tag-selector'
    },
    {
      // BEGIN-SNIPPET clicker-field-options.js
      fieldType: 'clicker',
      clickerText: null, // String - text to display in the clicker element.
      displayComponent: null, // String - path to the component
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/clicker',
    },
    {
      // BEGIN-SNIPPET staticContent-field-options.js
      fieldType: 'staticContent',
      text: null,
      textElement: 'h3 ', // TODO check this
      contentComponent: {
        path: null, // String - path to the component to display
        props: null // Object - properties to be passed to the component above.
      },
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/static-content',

    }
  ],
};
// END-SNIPPET
export {addonDefaults};

export default function getWithDefault(formSchema = {}) {
  const appDefaults = config.changesetWebformsDefaults || {};
  const formSettings = _merge({}, addonDefaults.formSettings, appDefaults.formSettings, formSchema.settings);
  const addonFieldDefaults = addonDefaults.fieldSettings || {};
  const appConfigFieldDefaults = appDefaults.fieldSettings || {};
  const mergedFields = (formSchema.fields || []).map(field => {

for (const key in field) {
  if (typeof field[key] === 'string' && field[key].indexOf('_defaults') > -1) {
    console.log(field[key])
  }
}

    const addonFieldTypeDefaults = addonDefaults.fieldTypes.find(addonFieldType => addonFieldType.fieldType === field.fieldType);
    const appConfigFieldTypeDefaults = (appDefaults.fieldTypes || []).find(appConfigFieldType => appConfigFieldType.fieldType === field.fieldType);
    const mergedField = _merge({}, addonFieldDefaults, addonFieldTypeDefaults, appConfigFieldDefaults, appConfigFieldTypeDefaults, formSchema.fieldSettings, field);
    if (field.cloneFieldSchema) {
      const cloneAddonFieldTypeDefaults = addonDefaults.fieldTypes.find(addonFieldType => addonFieldType.fieldType === field.cloneFieldSchema.fieldType);
      const appConfigCloneFieldTypeDefaults = (appDefaults.fieldTypes || []).find(appConfigFieldType => appConfigFieldType.fieldType === field.cloneFieldSchema.fieldType);
      const mergedCloneField = _merge({}, addonFieldDefaults, cloneAddonFieldTypeDefaults, appConfigFieldDefaults, appConfigCloneFieldTypeDefaults, formSchema.fieldSettings, field.cloneFieldSchema);
      mergedField.cloneFieldSchema = mergedCloneField;
    }
    return mergedField;
  });
  return {
    formSettings: formSettings,
    fields: mergedFields
  };
}