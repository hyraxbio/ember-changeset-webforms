import Component from '@glimmer/component';

export default class StaticContentExampleOneComponent extends Component {
  // BEGIN-SNIPPET static-content-example-1.js
  formSchema = {
    formSettings: {
      formName: 'staticContentExample1',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'staticContent',
        fieldType: 'staticContent',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero similique, repellat fuga ad enim eveniet exercitationem earum et commodi necessitatibus doloremque saepe veniam consequuntur maxime a soluta ea perferendis sit.',
        textElement: 'p',
        textElementClass: 'bg-success text-white p-2 rounded',
      },
    ],
  };
  // END-SNIPPET
}
