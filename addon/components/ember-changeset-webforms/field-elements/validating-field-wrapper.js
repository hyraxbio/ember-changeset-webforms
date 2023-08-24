import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/validating-field-wrapper';
import dynamicClassNames from 'ember-changeset-webforms/utils/dynamic-class-names';

@tagName('')
@templateLayout(layout)
export default class ValidatingFieldWrapper extends Component {
  @computed('dataTestFieldId')
  get dataTestId() {
    if (!this.dataTestFieldId) {
      return;
    }
    return `${this.dataTestFieldId}-field`;
  }

  @computed('typeClass')
  get dataTestClass() {
    if (!this.typeClass) {
      return;
    }
    return `cwf-${this.typeClass}`;
  }

  @computed('changesetWebform', 'formField.validationStatus')
  get fieldWrapperClassNames() {
    return dynamicClassNames('fieldWrapper', this.changesetWebform, this.formField);
  }

  @computed('formField.required')
  get requiredClasses() {
    return this.formField.required ? dynamicClassNames('requiredField', this.changesetWebform, this.formField) : '';
  }

  @computed('formField.disabled')
  get disabledClasses() {
    return this.formField.disabled ? dynamicClassNames('disabledField', this.changesetWebform, this.formField) : '';
  }

  @computed('formField.validates')
  get validatesClasses() {
    return this.formField.validates ? dynamicClassNames('fieldValidates', this.changesetWebform, this.formField) : '';
  }

  @computed('formField.wasValidated')
  get wasValidatedClasses() {
    return this.formField.wasValidated ? dynamicClassNames('validatedField', this.changesetWebform, this.formField) : '';
  }

  @computed('formField.focussed')
  get focussedClasses() {
    return this.formField.focussed ? dynamicClassNames('focussedField', this.changesetWebform, this.formField) : '';
  }
}
