import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class StaticContent extends Component {
  get textElement() {
    return htmlSafe(
      `<${this.formField.textElement} class="${this.formField.textElementClass}">${this.formField.text}</${this.formField.textElement}>`
    );
  }
}
