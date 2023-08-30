import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/static-content';
import { htmlSafe } from '@ember/template';

@templateLayout(layout)
@tagName('')
export default class StaticContent extends Component {
  get textElement() {
    return htmlSafe(
      `<${this.formField.textElement} class="${this.formField.textElementClass}">${this.formField.text}</${this.formField.textElement}>`
    );
  }
}
