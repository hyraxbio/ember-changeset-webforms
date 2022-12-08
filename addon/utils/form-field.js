import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';

export default EmberObject.extend({
  validationStatus: computed('changeset.error', 'focussed', 'eventLog.[]', function () {
    var formField = this;
    if (!formField) { return; }
    if (!formField.validates) { return; }
    if (!validationEventObj(formField.validationEvents, 'keyUp') && formField.get('focussed')) {
      return;
    }
    if (!validationEventLog(formField).length) { return }

    var validationErrors = (this.get(`changeset.error.${formField.propertyName}.validation`)) || [];
    if (validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),
})

function validationEventObj(validationEvents, eventType) {
  return validationEvents.find(validationEvent => {
    return validationEvent.event === eventType;
  });
}
