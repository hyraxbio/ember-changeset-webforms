import config from 'ember-get-config';
import _mergeWith from 'lodash.mergewith';
import mergeWithDefaultClassNames from 'ember-changeset-webforms/utils/merge-with-default-class-names';

const addonDefaults = {
  generalClassNames: {
    // BEGIN-SNIPPET configurable-classnames.js
    // Generic element classes
    inputElement: ['form-control', 'validation-area', '$validationClassNames'],
    textareaElement: [
      'form-control',
      'validation-area',
      '$validationClassNames',
    ],
    labelElement: ['form-label'],
    checkboxElement: ['form-check-input', '$validationClassNames'],
    radioButtonElement: ['form-check-input', '$validationClassNames'],
    buttonElement: ['btn', '$validationClassNames'],
    buttonIcon: ['ms-1'],
    // Request in flight
    requestInFlight: [
      'request-in-flight',
      'spinner-border',
      'spinner-border-sm',
    ],
    // Generic field classes- apply to all fields
    disabledField: ['disabled'],
    focussedField: ['focussed'],
    fieldWrapper: ['cwf-field', 'test', '$validationClassNames'],
    fieldControls: ['field-controls', '$validationClassNames'],
    fieldLabel: null,
    requiredField: ['required'],
    optionsWrapper: ['cwf-field-options'],
    // Generic validation related classes - apply to all fields
    validClassNames: ['is-valid'],
    invalidClassNames: ['is-invalid'],
    validationErrors: [
      'cwf-field-errors',
      'invalid-feedback',
      '$validationClassNames',
    ],
    fieldValidates: ['validates'],
    validatedField: ['was-validated'],
    // Form wrapper
    formWrapper: ['cwf-form-wrapper'],
    // Form action element element classes
    formFields: ['form-fields'],
    formActions: ['form-actions', 'mt-4'],
    submitButton: ['btn-primary', 'form-submit-button', 'btn-lg'],
    submitButtonIcon(classNameSettings, changesetWebform /* formField */) {
      if (changesetWebform.formSettings.requestInFlight) {
        return classNameSettings.requestInFlight;
      }
    },
    rollbackChangesetButton: ['btn-gray-medium'],
    clearFormButton: ['btn-gray-medium'],
    // fieldType === 'input
    fieldWrapperInput: ['cwf-field-input'],
    // fieldType === 'clonable'
    clonedFormField: ['cwf-clone-field-controls'],
    maxClonesReached: ['cwf-max-clones-reached'],
    addCloneButton: ['btn-secondary'],
    removeClone: ['hover-pointer', 'remove-clone', 'clone-actions', 'width-xl'],
    // fieldType === 'powerSelect'
    powerSelectTrigger: ['form-control'],
    // fieldType === powerDatePicker
    powerDatePickerTriggerWrapper: ['form-control', 'input'],
    powerDatePickerTriggerInput: null,
    powerDatePickerDropdown: ['bg-transparent'],
    powerDatePickerDropdownInner: [
      'bg-white',
      'p-2',
      'border',
      'rounded',
      'd-flex',
      'flex-column',
      'align-items-center',
    ],
    powerDatePickerCalendar: null,
    powerDatePickerTimeSelectorContainer: ['cwf-time-selector', 'mt-2'],
    powerDatePickerTimeSelectorInput: ['inline'],
    powerDatePickerClearButton: ['clear-date-time-button', 'icon'],
    powerDatePickerCalendarIcon: ['calendar-icon', 'icon'],
    powerDatePickerCalendarNav: ['d-flex', 'align-items-center'],
    powerDatePickerCalendarDays: null,
    // fieldType === 'clicker';
    clickerElement: ['cwf-clicker'],
    // fieldType === ('singleCheckBox' || 'checkBoxGroup)
    checkboxLabel: ['form-check-label'],
    labelledCheckbox: ['form-check', 'labelled-checkbox'],
    // fieldType === 'radioButtonGroup
    labelledRadioButton: ['form-check', 'labelled-radio-button'],
    radioButtonLabel: ['form-check-label'],
    // END-SNIPPET
  },
  formSettings: {
    // BEGIN-SNIPPET form-settings-options.js
    formName: null, // String. Must be unique. Used as a namespace for things like input ID and 'for' attributes..
    novalidate: true, // Disable the browser's native validation feedback
    hideSubmitButton: null, // Boolean - hides the submit button if true
    submitButtonText: 'Submit', // String - text to show on the submit form button
    submitButtonIcon: null, // String - path to the component icon to show on the submit form button. Note that if null, an empty element will still appear on the submit button, with the class names defined for submitButtonIcon. If false, the element will not appear on the submit button.
    clearFormAfterSubmit: null, // Boolean or string - if true, all fields are reset to their defaults after a the form submitAction returns successfully. If set to `suppressDefaultValues` all fields will br cleared.
    showClearFormButton: null, // Boolean - whether or not to show the button that will empty all fields TODO check if this works
    clearFormButtonText: 'Clear form', // String - text to show on the clear form button TODO implement
    submitAfterClear: null, // Boolean. If true submits the form after the clear form button is clicked. An example use case is a filters form with a clear filters button, where the desired behaviour is to clear the form fields, and then submit the empty form to reset the filters
    showRollbackChangesetButton: null, // Boolean - if true, a button is shown which call the changeset.rollback() method. See https://github.com/poteto/ember-changeset#rollback
    showRollbackChangesetButtonText: 'Discard changes',

    // END-SNIPPET
  },
  fieldSettings: {
    // TODO document that these can all be included in a form in "fieldSettings"
    fieldId: null,
    propertyName: null, // Optional, defaults to the value oif fieldId if not set.
    name: null, // String - defaults to the fieldId
    // BEGIN-SNIPPET generic-field-settings.js
    validationRules: [], // Array of objects defining validation rules. See "Validation".
    validatesOn: [], // Array of strings, possible values include focusOut, keyUp, onChange // TODO check onChanger as validation event
    alwaysValidateOn: [
      'focusOut',
      'change',
      'submit',
      'removeClone',
      'optionSelected',
    ], // Array of strings
    showValidationWhenFocussed: null, // Boolean - unless this is tru, validation colours, icons and messages will be hidden for as long as the "focussed" prop of a field is true. The build in input and textarea fields set focussed to true when the user focuesses the element.
    hideSuccessValidation: null, // Boolean - only show validation colours when field validation fails
    hidden: null, // Boolean - if true, the field is hidden and also ignored when validating or submitting the form
    castOut: null, // Boolean - exclude the field from validation and submission
    defaultValue: null, // Any - auto set the changeset property for the field to this value when the ChangesetWebform component is rendered and the changeset is created. This value will be overridden by a corresponding property in the data object that is passed to the ChangesetWebform component.
    fieldLabel: null, // String - the label to show on the field
    labelComponent: null, // Object - path to a component to use as the label. If set, takes the place of fieldLabel
    hideLabel: null, // Hide the label from the user
    disabled: null, // Boolean - disable the field, but do not hide it. It will still be validated [TODO check] and included when the form is submitted
    classNames: {}, // Object - keys can correspond to those in the classNames settings. See /docs/configure-classnames
    // END-SNIPPET
    eventLog: [],
  },
  fieldTypes: [
    {
      // BEGIN-SNIPPET input-field-options.js
      fieldType: 'input',
      inputType: 'text', // String - the html input type
      autofocus: null, // Boolean - whether to autofocus the input on insert
      placeholder: null, // String - placeholder text of the input
      trim: true, // Trim spaces from the beginning and end of the input after focus out. This is never applied to inputs with type password, even if true.
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/input',
    },
    {
      // BEGIN-SNIPPET clone-group-field-options.js
      fieldType: 'clone-group',
      maxClonesReachedText: 'Max clones reached.', // String
      removeCloneComponent: 'icons/icon-trash', // String - path to the component to use as the remove clone element
      addCloneButtonComponent:
        'ember-changeset-webforms/cloned-field-elements/add-clone-button', // String - path to the component to use as the add clone element
      hideSuccessValidation: true,
      minClones: 1, // Number - minimum number of clones allowed.
      maxClones: null, // Number - maximum number of clones allowed.
      cloneButtonText: null, // String - text to show in the add clone button. Defaults to `Add ${clonedField.fieldLabel} field`
      cloneFieldSchema: {}, // Object - the field definition of the clones, defined in the same way that you would define the field as a one off field.
      // END-SNIPPET
      componentPath:
        'ember-changeset-webforms/cloned-form-fields/validating-form-field-clone-group',
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
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/power-select',
    },
    {
      // BEGIN-SNIPPET powerDatePicker-field-options.js
      fieldType: 'powerDatePicker',
      dateTimeFormat: 'YYYY-MM-DD HH:mm:ss', // String - time format to use
      dateTimeDisplayFormat: null, // String - the format of the datetime to show in the trigger input. Defaults to dateTimeFormat if null.
      defaultTime: '00:00:00.000', // String - default time. Must be in the format HH:mm:ss.SSS.
      fixedTime: null, // String - force the time to a value, whatever tha date is. Must be in the format HH:mm:ss.SSS
      showTimeSelector: null, // Boolean - show the UI for the user to change the time.
      timeSelectorFields: 'HH,mm,ss,SSS', // String - comma separated list of the fields to show in the time selector component. combination of valid momentjs time string parts can be given.
      calendarTitleFormat: 'MMMM YYYY',
      timeInputLabels: {
        hours: 'Hour',
        minutes: 'Min',
        seconds: 'Sec',
        milliseconds: 'Msec',
        amPm: 'AM/PM',
      },
      closeDatePickerOnSelect: false,
      dateRangeSettings: null,
      minDate: null, // String - the earliest day that the calendar will allow the user to select. Must be in the format YYYY-MM-DD.
      maxDate: null, // String - the latest day that the calendar will allow the user to select. Must be in the format YYYY-MM-DD.
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/power-datepicker',
    },
    {
      // BEGIN-SNIPPET singleCheckbox-field-options.js
      fieldType: 'singleCheckbox',
      checkBoxLabelComponent: null, // String - path to the component to use as the checkbox label
      checkBoxLabelMarkdown: null, // Markdown string - a markdown string to render as HTML TODO doc what addon is needed to use this and add to all the other labels.
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
      maxDate: null, // String in format 2021-06-01T12:19:39.174Z
      startTime: null, // String in format 00:01
      endTime: null, // String in format 23:59
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/date-range',
    },
    {
      // BEGIN-SNIPPET tagSelector-field-options.js
      fieldType: 'tagSelector',
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/tag-selector',
    },
    {
      // BEGIN-SNIPPET clicker-field-options.js
      fieldType: 'clicker',
      clickerText: null, // String - text to display in the clicker element.
      displayComponent: null, // Can either be string which is the path to the component or an object with a property called path being the path to the component and props, an object which will be passed to the component as "props".
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/clicker',
    },
    {
      // BEGIN-SNIPPET staticContent-field-options.js
      fieldType: 'staticContent',
      text: null,
      textElement: 'h3 ', // TODO check this
      contentComponent: null, // Can either be string which is the path to the component or an object with a property called path being the path to the component and props, an object which will be passed to the component as "props".
      // END-SNIPPET
      componentPath: 'ember-changeset-webforms/fields/static-content',
    },
  ],
};
// END-SNIPPET

export { addonDefaults };

export default function getWithDefault(formSchema = {}) {
  const appDefaults = config.changesetWebformsDefaults || {};
  const formSettings = _mergeWith(
    {},
    addonDefaults.formSettings,
    appDefaults.formSettings,
    formSchema.formSettings,
  );
  const classNameSettings = _mergeWith(
    {},
    addonDefaults.generalClassNames,
    appDefaults.generalClassNames,
    formSchema.generalClassNames,
    mergeWithDefaultClassNames,
  );
  const addonFieldDefaults = addonDefaults.fieldSettings || {};
  const appConfigFieldDefaults = appDefaults.fieldSettings || {};
  const mergedFields = (formSchema.fields || []).map((field) => {
    const addonFieldTypeDefaults = addonDefaults.fieldTypes.find(
      (addonFieldType) => addonFieldType.fieldType === field.fieldType,
    );
    const appConfigFieldTypeDefaults = (appDefaults.fieldTypes || []).find(
      (appConfigFieldType) => appConfigFieldType.fieldType === field.fieldType,
    );
    const mergedField = _mergeWith(
      {},
      addonFieldDefaults,
      addonFieldTypeDefaults,
      appConfigFieldDefaults,
      appConfigFieldTypeDefaults,
      formSchema.fieldSettings,
      field,
    );
    if (field.cloneFieldSchema) {
      const cloneAddonFieldTypeDefaults = addonDefaults.fieldTypes.find(
        (addonFieldType) =>
          addonFieldType.fieldType === field.cloneFieldSchema.fieldType,
      );
      const appConfigCloneFieldTypeDefaults = (
        appDefaults.fieldTypes || []
      ).find(
        (appConfigFieldType) =>
          appConfigFieldType.fieldType === field.cloneFieldSchema.fieldType,
      );
      const mergedCloneField = _mergeWith(
        {},
        addonFieldDefaults,
        cloneAddonFieldTypeDefaults,
        appConfigFieldDefaults,
        appConfigCloneFieldTypeDefaults,
        formSchema.fieldSettings,
        field.cloneFieldSchema,
      );
      mergedField.cloneFieldSchema = mergedCloneField;
    }
    return mergedField;
  });
  return {
    classNameSettings: classNameSettings,
    formSettings: formSettings,
    fields: mergedFields,
  };
}
