export default function eventLogValidated(formField) {
  return formField.validatesOn.filter((eventName) =>
    formField.eventLog.includes(eventName),
  );
}
