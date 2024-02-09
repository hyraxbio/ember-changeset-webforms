import { action } from '@ember/object';
// BEGIN-SNIPPET after-generate-changeset-webform-form.js
import Component from '@glimmer/component';
import validateFields from 'ember-changeset-webforms/utils/validate-fields';
import { tracked } from '@glimmer/tracking';

export default class AfterGenerateChangesetWebformForm extends Component {
  @tracked step = 1;

  formSchema = {
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
        validatesOn: ['insert'],
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

  @action
  afterGenerateChangesetWebform(changesetWebform) {
    this.changesetWebform = changesetWebform;
  }

  @action
  next() {
    const currentStep = this.step;
    const changesetWebform = this.changesetWebform;
    validateFields(changesetWebform).then(() => {
      if (changesetWebform.changeset.isValid) {
        this.step = currentStep + 1;
      }
    });
  }

  @action
  prev() {
    const currentStep = this.step;
    this.step = currentStep - 1;
  }
}
//END-SNIPPET
