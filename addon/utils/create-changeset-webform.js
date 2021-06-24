import createChangeset from 'ember-changeset-webforms/utils/create-changeset';
import getWithDefaultUtil from 'ember-changeset-webforms/utils/get-with-default';
import parseChangesetWebformField from 'ember-changeset-webforms/utils/parse-changeset-webform-field';
import EmberObject from '@ember/object';

export default function createChangesetWebform(formSchema, data, customValidators) {
  const formSchemaWithDefaults = getWithDefaultUtil(formSchema);
  const parsedFields = formSchemaWithDefaults.fields.map(item => parseChangesetWebformField(item, customValidators));
  return  {
    changeset: createChangeset(parsedFields, data, customValidators),
    fields: parsedFields,
    formSettings: EmberObject.create(formSchema.settings),
    formSchema: {...formSchema}
  }
}
