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
    if (element.classList.contains('is-valid') || element.querySelector('.is-valid')) { return true; }
    return false;
  },

  allPassedValidation(arg, indexes) {
    const elements = this.getElements(arg, indexes);
    let allPassed = true;
    elements.forEach(el => {
      if (!this.passedValidation(el)) {
        allPassed = false;
      }
    })
    return allPassed;
  },

  failedValidation(arg) {
    const element = this.getElement(arg);
    if ((element.classList.contains('is-invalid') || element.querySelector('.is-invalid')) && element.querySelector(els.emberChangesetWebformsFieldErrors)) { return true; }
    return false;
  },

  allFailedValidation(arg, indexes) {
    const elements = this.getElements(arg, indexes);
    let allFailed = true;
    elements.forEach(el => {
      if (!this.failedValidation(el)) {
        allFailed = false;
      }
    })
    return allFailed;
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

  async removeClone(arg, indexes) {
    const element = this.getElement(arg);
    if (indexes) {
      const elementsToClick = indexes.map(index => element.querySelectorAll(els.removeClone)[index]);
      for (var el of elementsToClick) {
        await click(el);
      }
    } else {
      await click(element.querySelector(els.removeClone));
    }
  },

  async addClone(arg) {
    const element = this.getElement(arg);
    await click(element.querySelector(els.emberChangesetWebformsAddCloneButton));
  },

  async submitForm(arg) {
    const element = this.getElement(arg);
    await click(element.querySelector(els.emberChangesetWebformsSubmitButton));

  }
}