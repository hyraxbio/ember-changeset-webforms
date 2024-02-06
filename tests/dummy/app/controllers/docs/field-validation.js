import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

// BEGIN-SNIPPET import-custom-validators.js
// TODO do this
export default class Fieldvalidation extends Controller {
  //END_SNIPPET

  @service session;
  signupFormSchema = this.session.signupFormSchema;

  @action
  submit() {}

  @action
  submitSuccess() {}
}
