import Controller from '@ember/controller';
import { addonDefaults } from 'ember-changeset-webforms/utils/get-with-default';

export default class ConfigureClassnames extends Controller {
  fieldTypes = addonDefaults.fieldTypes.map((item) => item.fieldType);
}
