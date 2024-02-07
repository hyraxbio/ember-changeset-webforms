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
  @tracked dateTimeOutput;

  // BEGIN-SNIPPET after-datetime-updated-action.js
  @action
  afterDatetimeUpdated(formField, ChangesetWebform) {
    const dateTime = ChangesetWebform.changeset.get('startDate');
    this.dateTimeOutput = new DateOutput({
      nativeJSFormat: moment(dateTime, formField.dateTimeFormat).toDate(),
      fieldValue: dateTime,
    });
  }

  // END-SNIPPET
}
