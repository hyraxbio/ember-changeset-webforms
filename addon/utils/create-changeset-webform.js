import createChangeset from 'ember-changeset-webforms/utils/create-changeset';
import getWithDefaultUtil from 'ember-changeset-webforms/utils/get-with-default';
import parseChangesetWebformField from 'ember-changeset-webforms/utils/parse-changeset-webform-field';
import FormSettings from 'ember-changeset-webforms/utils/form-settings';

export default function createChangesetWebform(
  formSchema,
  data,
  customValidators,
  opts,
) {
  const formSchemaWithDefaults = getWithDefaultUtil(formSchema);
  const parsedFields = formSchemaWithDefaults.fields.map((item) =>
    parseChangesetWebformField(
      item,
      customValidators,
      formSchemaWithDefaults.formSettings,
    ),
  );
  const changeset = createChangeset(parsedFields, data, customValidators, opts);
  parsedFields.forEach((field) => {
    field.changeset = changeset;
  });
  return {
    changeset: changeset,
    fields: parsedFields,
    formSettings: new FormSettings(formSchemaWithDefaults.formSettings),
    formSchema: { ...formSchema },
    formSchemaWithDefaults: { ...formSchemaWithDefaults },
  };
}
