import createChangeset from 'ember-changeset-webforms/utils/create-changeset';
import parseChangesetWebformFields from 'ember-changeset-webforms/utils/parse-changeset-webform-schema';
import EmberObject from '@ember/object';

export default function createChangesetWebform(formSchema, fieldComponentsMap, data, customValidators) {
  return  {
    changeset: createChangeset(formSchema.fields, data, customValidators),
    fields: parseChangesetWebformFields(formSchema, fieldComponentsMap),
    formSettings: EmberObject.create(formSchema.settings),
    formSchema: {...formSchema}
  }
}
