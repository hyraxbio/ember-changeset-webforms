import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class StaticContent extends Component {
  get textElement() {
    return htmlSafe(
      `<${this.args.formField.textElement} class="${this.args.formField.textElementClass}">${this.args.formField.text}</${this.args.formField.textElement}>`,
    );
  }
}
