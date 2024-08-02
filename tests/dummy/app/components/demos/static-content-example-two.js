import Component from '@glimmer/component';

export default class StaticContentExampleTwoComponent extends Component {
  // BEGIN-SNIPPET static-content-example-2.js
  formSchema = {
    formSettings: {
      formName: 'staticContentExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'staticContent',
        fieldType: 'staticContent',
        contentComponent: {
          path: 'forms/component-for-static-content-field',
          props: {
            info: 'This text was passed to the label component dynamically for this option, via the contentComponent.props object',
          },
        },
      },
    ],
  };
  // END-SNIPPET
}
