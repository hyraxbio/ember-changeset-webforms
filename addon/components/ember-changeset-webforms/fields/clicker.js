import { action } from '@ember/object';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/clicker';

@templateLayout(layout)
@tagName('')
export default class Clicker extends Component {
  @action
  onClick(formField, event) {
    this.onUserInteraction(formField, 'click', null, event);
  }
}
