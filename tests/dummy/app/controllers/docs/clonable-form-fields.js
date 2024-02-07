import Controller from '@ember/controller';
import { addonDefaults } from 'ember-changeset-webforms/utils/get-with-default';
import { action } from '@ember/object';

export default class ClonableFormFields extends Controller {
  constructor() {
    super(...arguments);
    this.cloneGroupFieldAddonDefaults = addonDefaults.fieldTypes.find(
      (item) => item.fieldType === 'clone-group',
    );
  }

  @action
  submit() {}
}
