import Component from '@ember/component';

export default Component.extend({
  // BEGIN-SNIPPET after-field-click-action-form.js

  init() {
    this._super(...arguments);
    this.formSchema = {
      formSettings: {
        formName: 'names',
        submitButtonText: 'Submit',
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
          fieldId: 'toggleNicknameField',
          fieldType: 'clicker',
          clickerText: 'Show nickname field',
        },
        {
          fieldId: 'nickName',
          fieldLabel: 'Nickname',
          fieldType: 'input',
          inputType: 'text',
          hidden: true,
          validationRules: [
            {
              validationMethod: 'validatePresence',
              arguments: { presence: true, description: 'Nickname' },
            },
          ],
        },
      ],
    };
  },

  actions: {
    onUserInteraction(formField, changesetWebform, eventType) {
      if (eventType === 'click') {
        if (formField.fieldId === 'toggleNicknameField') {
          const nickNameField = changesetWebform.fields.findBy('fieldId', 'nickName');
          nickNameField.toggleProperty('hidden');
          formField.set('clickerText', nickNameField.hidden ? 'Show nickname field' : 'Hide nickname field');
        }
      }
    },

    submitAction(data, changsetWebform) {
      let dataProps = [];
      for (var key in data) {
        dataProps.push(`"${key}" => "${data[key]}"`);
      }
      this.set('alert', {
        type: 'success',
        message: `Validation passed, submit action fired with the following data: ${dataProps.join(', ')}.`,
      });
      const changeset = changsetWebform.changeset;
      changsetWebform.formSettings.set('submitButtonText', 'Re-submit');
      changeset.set('name', '');
      changeset.set('nickName', '');
    },

    formValidationFailed(changsetWebform) {
      const validationError = changsetWebform.changeset.error;
      let errorProps = [];
      for (var key in validationError) {
        errorProps.push(`"${key}" => "${validationError[key].validation.join(', ')}"`);
      }
      this.set('alert', {
        type: 'danger',
        message: `Validation failed, submit action not fired. The following validation errors exist:  ${errorProps.join(', ')}`,
      });
    },
  },
  // END-SNIPPET
});
