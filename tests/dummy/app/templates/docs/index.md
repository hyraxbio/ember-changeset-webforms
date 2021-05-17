# What is Ember Changset Webforms

**Ember Changset Webforms** is a fully formed webform generation addon, based on [Ember Changeset](https://github.com/poteto/ember-changeset) and [Ember Changeset Validations](https://github.com/poteto/ember-changeset-validations).

* Define your form schema as plain old JavaScript object, and the `ChangesetWebform` component will render the form.
* The addon provides 11 default fields.
* You can create custom fields.
* You can define a field as clonable.
* You have fine grained control over CSS classes at global, form and individual field level.
* The addon integrates all of the validation methods which are part of [Ember Changeset Validations](https://github.com/poteto/ember-changeset-validations) by default.
* You can define your own validators.
* You can pass an array of validation event names, to control when validation happens for a specific field- these are `keyUp`, `insert`, `focusOut` and `onUserInteraction`.
* The addon has a built in form submit function, but also allows you to override this with a function of your own.
* The addon provides several action hooks.
* You are able to set and unset form fields as hidden. Using action hooks, this can also be used to create conditional fields.

TODO - stop send both fieldId and field from action hooks
TODO - exclude fields from changeset altogether, bot just castOut on submit. Set this is form when using field, or on field definition as a default.