import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/static-content';
import { htmlSafe } from '@ember/template';

@templateLayout(layout)
@tagName('')
export default class StaticContent extends Component {
  @computed('formField.{text,textElement}')
  get textElement() {
    return htmlSafe(`<${this.formField.textElement} class="${this.formField.textElementClass}">${this.formField.text}</${this.formField.textElement}>`);
  }
}
