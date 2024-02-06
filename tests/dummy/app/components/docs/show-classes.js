import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class ShowClasses extends Component {
  @action
  didInsert() {
    setTimeout(() => {
      this.doTheThing();
      document
        .querySelector('#validationClassNames-name')
        .addEventListener('change', () => {
          this.doTheThing();
        });
      document
        .querySelector('#validationClassNames-name')
        .addEventListener('keyup', () => {
          this.doTheThing();
        });
      document
        .querySelector('#validationClassNames-name')
        .addEventListener('blur', () => {
          this.doTheThing();
        });
    });
  }
  @action
  doTheThing() {
    const labelEls = Array.from(
      document.querySelectorAll('[data-test-class="cwf-field-label"]'),
    );
    labelEls.forEach((labelEl) => {
      const newTextContent = `Class = "${labelEl.className}"`;
      const existing = labelEl.querySelector('.element-classlist');
      if (existing) {
        existing.textContent = newTextContent;
        return;
      }
      const newEl = document.createElement('span');
      newEl.textContent = newTextContent;

      newEl.classList.add('monospaced');
      newEl.classList.add('text-grey');
      newEl.classList.add('inline-block');
      newEl.classList.add('element-classlist');
      newEl.classList.add('ms-2');
      newEl.classList.add('p-2');
      newEl.classList.add('rounded');
      labelEl.appendChild(newEl);
    });
  }
}
