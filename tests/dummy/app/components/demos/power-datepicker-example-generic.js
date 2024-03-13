import Component from '@glimmer/component';
import { action } from '@ember/object';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';

class DateOutput {
  @tracked nativeJSFormat;
  @tracked fieldValue;

  constructor(props) {
    this.nativeJSFormat = props.nativeJSFormat;
    this.fieldValue = props.fieldValue;
  }
}

export default class PowerDateickerExampleGenericComponent extends Component {
  @tracked dateTimeOutput = new DateOutput({});

  // BEGIN-SNIPPET after-datetime-updated-action.js
  @action
  afterDatetimeUpdated(formField) {
    this.dateTimeOutput.nativeJSFormat = moment(
      formField.fieldValue,
      formField.dateTimeFormat,
    ).toDate();
    this.dateTimeOutput.fieldValue = formField.fieldValue;
  }
  // END-SNIPPET

  @action
  afterFieldInserted(formField) {
    this.afterDatetimeUpdated(formField);
  }
}
