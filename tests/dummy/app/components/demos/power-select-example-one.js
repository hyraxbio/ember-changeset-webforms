import Component from '@glimmer/component';

export default class PowerSelectExampleOneComponent extends Component {
  // BEGIN-SNIPPET power-select-example-1.js
  formSchema = {
    formSettings: {
      formName: 'powerSelectExample1',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'country',
        fieldType: 'powerSelect',
        fieldLabel: 'Select country',
        placeholder: 'This is where the placeholder goes',
        searchPlaceholder: 'Custom placeholder for search box',
        allowClear: true,
        options: ['Aruba', 'Afghanistan', 'Angola', 'Albania', 'Andorra'],
      },
    ],
  };
  // END-SNIPPET
}
