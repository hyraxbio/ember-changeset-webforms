import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
    // BEGIN-SNIPPET external-props-form.js"
    this.formSchema = {
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
  },
  actions: {
    updateExternalProps(formField, changesetWebform) {
      this.formSettings = changesetWebform.formSettings;
      this.formField = formField;
      formField.externalProps.foo = 'bar';
      formField.externalProps = formField.externalProps;
      changesetWebform.formSettings.externalProps.foo = 'bar';
      changesetWebform.formSettings.externalProps =
        changesetWebform.formSettings.externalProps;
    },
  },
});
