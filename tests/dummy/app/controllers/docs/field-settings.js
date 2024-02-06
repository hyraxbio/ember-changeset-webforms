import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class FieldSettings extends Controller {
  @service session;
  clickerExample2FormSchema = this.session.clickerExample2FormSchema;
}
