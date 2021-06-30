export default function validationEventLog(formField) {
  const validationEventNames = formField.validationEvents.map(item => item.event);
  return validationEventNames.filter(validationEventName => {
    return formField.eventLog.indexOf(validationEventName) > -1
  });
}
