import Controller from '@ember/controller';

export default class BuiltInFields extends Controller {
  radioButtonGroupOption = {
    // BEGIN-SNIPPET radio-button-group-option.js
    value: null, //
    // Either one of labelComponent or label must be passed.
    label: null, // String to display as the label of the option.
    labelComponent: null, // Optional. Component to replace the standard label element for a single option.
    // END-SNIPPET
  };

  checkboxGroupOption = {
    // BEGIN-SNIPPET checkbox-group-option.js
    key: null,
    // Either one of labelComponent or label must be passed.
    label: null, // String to display as the label of the option.
    labelComponent: null, // Optional. Component to replace the standard label element for a single option
    // END-SNIPPET
  };
}
