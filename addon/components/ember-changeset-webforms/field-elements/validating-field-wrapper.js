import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class destinationElementClass {
  @tracked fieldActions;
  @tracked fieldContents;
  @tracked fieldWrapper;
}

export default class ValidatingFieldWrapper extends Component {
  @tracked destinationElement = new destinationElementClass();

  get dataTestId() {
    if (!this.args.dataTestFieldId) {
      return null;
    }

    return `${this.args.dataTestFieldId}`;
  }

  get dataTestClass() {
    if (!this.args.typeClass) {
      return null;
    }
    return `cwf-${this.args.typeClass}`;
  }

  get isGroup() {
    return this.args.formField.options ? true : null;
  }

  get hasFieldActions() {
    return (
      this.args.formField.isClone &&
      this.args.masterFormField.cloneCountStatus !== 'min'
    );
  }

  get fieldContentsDestinationElement() {
    return this.hasFieldActions
      ? this.destinationElement.fieldContents
      : this.destinationElement.fieldWrapper;
  }

  get cloneActionsDestinationElement() {
    return this.destinationElement[this.args.formField.cloneActionsPosition];
  }

  @action
  registerElementContainer(namespace, element) {
    this.destinationElement[namespace] = element;
  }
}
