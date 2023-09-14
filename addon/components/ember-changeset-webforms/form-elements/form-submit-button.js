import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import dynamicClassNames from 'ember-changeset-webforms/utils/dynamic-class-names';

export default class FormSubmitButton extends Component {
  @tracked changesetWebform;

  customType = 'button';

  get requestInFlightClassNames() {
    return dynamicClassNames('submitButton', this.args.changesetWebform);
  }
}
