import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Index extends Controller {
  @service session;
  signupFormSchema = this.session.signupFormSchema;

  @action
  submit(data) {}

  @action
  submitSuccess() {}
}
