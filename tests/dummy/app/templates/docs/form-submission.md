# Form submission

When a user clicks the submit button, the `submit` action is fired the `ChangesetWebform` component.

The following series of events occurs.

* All fields with validation rules are validated, unless the `skipValidate` or `hidden` properties on the field are true.
* The the `afterValidateFields` action is fired is passed, with `(changesetWebform, validationResult)` as arguments.
