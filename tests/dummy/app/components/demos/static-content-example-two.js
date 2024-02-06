import Component from '@glimmer/component';

  export default class StaticContentExampleTwoComponent extends Component {
  
  // BEGIN-SNIPPET static-content-example-2.js
  staticContentExample2FormSchema = {
    formSettings: {
      formName: 'staticContentExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'staticContent',
        fieldType: 'staticContent',
        contentComponent: {
          path: 'forms/component-for-single-checkbox-option',
          props: {
            info: 'Some additional info',
          },
        },
      },
    ],
  };
  // END-SNIPPET

// end-of-conent 
}