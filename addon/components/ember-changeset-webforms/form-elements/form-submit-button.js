import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/form-elements/form-submit-button';
import dynamicClassNames from 'ember-changeset-webforms/utils/dynamic-class-names';

@templateLayout(layout)
@tagName('')
export default class FormSubmitButton extends Component {
  customType = 'button';

  @computed('changesetWebform')
  get requestInFlightClassNames() {
    return dynamicClassNames('submitButton', this.changesetWebform);
  }
}
