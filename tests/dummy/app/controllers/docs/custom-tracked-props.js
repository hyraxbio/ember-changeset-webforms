import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class CustomTrackedProps extends Controller {
  // BEGIN-SNIPPET external-props-form.js"
  formSchema = {
    formSettings: {
      formName: 'nameForm',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
    ],
  };
  // END-SNIPPET

  @action
  updateExternalProps(formField, changesetWebform) {
    this.formSettings = changesetWebform.formSettings;
    this.formField = formField;
    formField.externalProps.foo = 'bar';
    formField.externalProps = formField.externalProps;
    changesetWebform.formSettings.externalProps.foo = 'bar';
    changesetWebform.formSettings.externalProps =
      changesetWebform.formSettings.externalProps;
  }
}
