import Component from '@glimmer/component';

export default class PowerSelectExampleTwoComponent extends Component {
  // BEGIN-SNIPPET power-select-example-2.js
  formSchema = {
    formSettings: {
      formName: 'powerSelectExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'country',
        fieldType: 'powerSelect',
        fieldLabel: 'Select country',
        optionDisplayProp: 'name',
        options: [
          {
            id: 'ABW',
            name: 'Aruba',
          },
          {
            id: 'AFG',
            name: 'Afghanistan',
          },
          {
            id: 'AGO',
            name: 'Angola',
          },
          {
            id: 'ALB',
            name: 'Albania',
          },
          {
            id: 'AND',
            name: 'Andorra',
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
