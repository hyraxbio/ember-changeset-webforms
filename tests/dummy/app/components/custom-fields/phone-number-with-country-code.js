import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class PhonerNumberWithCountryCodeComponent extends Component {
  countryCodes = [
    {
      name: 'Afghanistan',
      code: '93',
    },
    {
      name: 'Albania',
      code: '355',
    },
    {
      name: 'Algeria',
      code: '213',
    },
    {
      name: 'American Samoa',
      code: '1-684',
    },
    {
      name: 'Andorra',
      code: '376',
    },
    {
      name: 'Angola',
      code: '244',
    },
    {
      name: 'Anguilla',
      code: '1-264',
    },
    {
      name: 'Antarctica',
      code: '672',
    },
    {
      name: 'Antigua and Barbuda',
      code: '1-268',
    },
  ];
  get displayObject() {
    if (!this.args.displayValue) {
      return {};
    }
    return {
      countryCode: this.args.displayValue.split(' ')[0],
      phoneNumber: this.args.displayValue.split(' ')[1],
    };
  }

  get selectedCountryCode() {
    return this.countryCodes.find(
      (countryCode) => countryCode.code === this.displayObject.countryCode,
    );
  }

  @action
  inputKeyUp(event) {
    const updatedFieldValue = this.updatedFieldvalue(
      'phoneNumber',
      event.target.value,
    );

    this.args.onUserInteraction(
      this.args.formField,
      'keyUpPhoneNumberInput',
      updatedFieldValue,
    );
    console.log(event.target.value);
    if (event.target.value !== '') {
      this.args.onChange(this.args.formField, updatedFieldValue);
    }
  }
  @action
  inputChange(event) {
    console.log('change', event.target.value);
    const updatedFieldValue = this.updatedFieldvalue(
      'phoneNumber',
      event.target.value,
    );
    this.args.onChange(this.args.formField, updatedFieldValue); // TODO should these have formField included here?
  }

  @action
  inputFocusIn() {
    this.args.formField.focussed = true;
  }

  @action
  inputFocusOut() {
    this.args.formField.focussed = false;
    this.args.onUserInteraction(
      this.args.formField,
      'focusOutPhoneNumberInput',
    ); // TODO should these have formField included here?
  }

  @action
  codeSelected(formField, value) {
    const updatedFieldValue = this.updatedFieldvalue('countryCode', value.code);
    this.args.onUserInteraction(formField, 'countryCodeSelected');
    this.args.onChange(formField, updatedFieldValue);
  }

  updatedFieldvalue(key, value) {
    const newObj = Object.assign({}, this.displayObject);
    newObj[key] = value;
    return `${newObj.countryCode || ''} ${newObj.phoneNumber || ''}`;
  }
}
