import Component from '@glimmer/component';

export default class SingleCheckboxExampleThreeComponent extends Component {
  // BEGIN-SNIPPET single-checkbox-example-3.js
  formSchema = {
    formSettings: {
      formName: 'singleCheckboxExample3',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'acceptTerms',
        fieldType: 'singleCheckbox',
        checkBoxLabelComponent: {
          path: 'forms/component-for-single-checkbox-option',
          props: {
            info: 'This text was passed to the label component dynamically for this option, via the checkBoxLabelComponent.props object.',
          },
        },
      },
    ],
  };
  // END-SNIPPET
}
