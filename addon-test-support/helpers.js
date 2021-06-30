import { find, findAll, click } from '@ember/test-helpers';
import els from 'ember-changeset-webforms/test-support/element-selectors';

export default {
  fieldErrorText(arg) {
    const element = this.getElement(arg);
    const errors = element.querySelectorAll(els.emberChangesetWebformsFieldError);
    if (!errors) { return; }
    return Array.from(errors).map(error => error.textContent.trim());
  },

  getElement(arg) {
    let element;
    if (typeof arg === 'string') {
      element = find(arg);
      if (!element) {
        throw(`No element with selector ${arg} was found`);
      }
    } else {
      element = arg;
    }
    return element;
  },

  getElements(arg, indexes) {
    let elements;
    if (typeof arg === 'string') {
      elements = findAll(arg);
    } else {
      elements = arg;
    } 
    if (indexes) {
      elements = indexes.map(index => elements[index]);
    }
    return elements;
  },

  passedValidation(arg) {
    const element = this.getElement(arg);
    if (element.classList.contains('valid') || element.querySelector('.valid')) { return true; }
    return false;
  },

  failedValidation(arg) {
    const element = this.getElement(arg);
    if ((element.classList.contains('invalid') || element.querySelector('.invalid')) && element.querySelector(els.emberChangesetWebformsFieldErrors)) { return true; }
    return false;
  },

  wasValidated(arg) {
    return this.passedValidation(arg) || this.failedValidation(arg);
  },

  allValidated(arg, indexes) {
    const els =  this.getElements(arg, indexes);
    return els.map(el => this.wasValidated(el)).every(item => item === true);
  },

  noneValidated(arg, indexes) {
    const els =  this.getElements(arg, indexes);
    return !els.map(el => this.wasValidated(el)).filter(item => item === true);
  },

  async removeClone(arg) {
    const element = this.getElement(arg);
    await click(element.querySelector(els.removeClone));
  },

  async addClone(arg) {
    const element = this.getElement(arg);
    await click(element.querySelector(els.emberChangesetWebformsAddCloneButton));
  }
}