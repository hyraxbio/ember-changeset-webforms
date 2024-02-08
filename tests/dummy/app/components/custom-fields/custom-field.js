import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class PhoneNumberWithCountryCodeComponent extends Component {
  @action
  onKeyUp(event) {
    this.handleKeyUp(event); // this.send
  }

  @action
  handleKeyUp(...args) {
    console.log(args);
    // const updatedFieldValue = this.updatedFieldvalue(
    //   this.args.displayValue,
    // );
    // this.args.onUserInteraction(
    //   this.args.clonedFormField,
    //   'keyUp',
    //   updatedFieldValue,
    // );
    // if (e.target.value !== '') {
    //   this.args.onChange(this.args.clonedFormField, updatedFieldValue);
    // }
  }

  @action
  changeAction(...args) {
    console.log(args);
    // const updatedFieldValue = this.updatedFieldvalue(
    //   this.args.displayValue,
    //   'delimiterChars',
    //   delimiterCharValue,
    // );
    // this.args.onChange(this.args.clonedFormField, updatedFieldValue); // TODO should these have formField included here?
  }

  @action
  focusInAction() {
    this.args.onUserInteraction(this.args.clonedFormField, 'focusIn'); // TODO should these have formField included here?
  }

  @action
  focusOutAction(...args) {
    copnsole.log(args);
    return;
    var delimiterCharValue = e.target.value || '';
    if (delimiterCharValue.length > 1 && delimiterCharValue.trim() === '')
      delimiterCharValue = ' '; // multiple spaces
    if (delimiterCharValue.length > 1)
      delimiterCharValue = delimiterCharValue.trim(); // this caters for a space
    const updatedFieldValue = this.updatedFieldvalue(
      this.args.displayValue,
      'delimiterChars',
      delimiterCharValue,
    );
    this.args.onUserInteraction(
      this.args.clonedFormField,
      'focusOut',
      updatedFieldValue,
    );
  }

  @action
  delimiterSectionSelected(formField, value) {
    const updatedFieldValue = this.updatedFieldvalue(
      this.args.displayValue,
      'delimiterSection',
      value,
    );
    this.args.onUserInteraction(
      this.args.clonedFormField,
      'delimiterSectionSelected',
    );
    this.args.onChange(this.args.clonedFormField, updatedFieldValue);
  }

  updatedFieldvalue(currentFieldValue, partToUpdate, value) {
    var pos = partToUpdate === 'delimiterSection' ? 0 : 1;
    var newFieldValue = [...currentFieldValue]; // Must use spread to copy the array and avoid mutating the original below, which would break the displayValue CP.
    newFieldValue[pos] = value;
    return newFieldValue;
  }
}
