import Controller from '@ember/controller';
import { addonDefaults } from 'ember-changeset-webforms/utils/get-with-default';

// BEGIN-SNIPPET test.js
export default Controller.extend({
  init() {
    this._super(...arguments);
  console.log(addonDefaults)


  }
})