import { action } from '@ember/object';
// BEGIN-SNIPPET after-generate-changeset-webform-form.js
import Component from '@ember/component';
import validateFields from 'ember-changeset-webforms/utils/validate-fields';

export default class AfterGenerateChangesetWebformForm extends Component {
  step = 1;

  init() {
    super.init(...arguments);
    this.formSchema = {
      formSettings: {
        formName: 'nameAndEmail',
        hideSubmitButton: true,
        hideLabels: true,
      },
      fields: [
        {
          fieldId: 'name',
          fieldLabel: 'Name',
          fieldType: 'input',
          validationRules: [
            {
              validationMethod: 'validatePresence',
              arguments: true,
            },
          ],
          inputType: 'text',
        },
        {
          fieldId: 'email',
          fieldLabel: 'Email',
          fieldType: 'input',
          validationEvents: ['insert'],
          validationRules: [
            {
              validationMethod: 'validatePresence',
              arguments: true,
            },
            {
              validationMethod: 'validateFormat',
              arguments: { type: 'email' },
            },
          ],
          inputType: 'email',
        },
      ],
    };
  }

  @action
  afterGenerateChangesetWebform(changesetWebform) {
    this.set('changesetWebform', changesetWebform);
  }

  @action
  next() {
    const currentStep = this.step;
    const changesetWebform = this.changesetWebform;
    validateFields(changesetWebform).then(() => {
      if (changesetWebform.changeset.isValid) {
        this.set('step', currentStep + 1);
      }
    });
  }

  @action
  prev() {
    const currentStep = this.step;
    this.set('step', currentStep - 1);
  }
}
//END-SNIPPET
