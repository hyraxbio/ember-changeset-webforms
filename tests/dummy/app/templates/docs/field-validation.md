# Field validation

## Validation events

A field will validate:

- on focus out, if the field has a `fieldType` of `input` or `textarea`.
- whenever the value of the field is changed by user interaction, except if the field has a `fieldType` of `input` or `textarea`, and the relevant `input` or `textarea` is currently focussed.
- on key up, if the field has a `fieldType` of `input` or `textarea`, and the field has `keyUp` included in the `validatesOn` array (See the name field in the example below).
- on insert, where the field has `insert` included in the `validatesOn` array, and the field is not empty (See the email field in the example below).
- when the user submits the form, either by clicking the submit button, or by hitting th enter key when focussed into the `input` or `textarea` field (All fields with validation rules are validated in this instance).

**Note that to validate on insert or key up, you must include the `validatesOn` array, and pass either or both of `['keyUp', 'insert']`.**

Note also that the forms submit function will not be fired if any fields fail validation.

## Defining validation rules

This addon uses [Ember Changeset Validations](https://github.com/poteto/ember-changeset-validations) to handle validation, and also as its default library of validators.

The [Ember Changeset Validations usage documentation](https://github.com/poteto/ember-changeset-validations#usage) outlines how you create a validation map and then pass that map to the changeset generator, so that the validations are integrated into your changeset.

With **Ember Changeset Webforms** the importing of the validations library, construction of the validations map and creation of the changeset are handled for you.

You need only specify the validations that you'd like to apply to each field in the `validationRules` array.

Each item in a fields `validationRules` array is an object that must contain a `validationMethod` property, which must correspond to a validation rule in the [Ember Changeset Validations validator api](https://github.com/poteto/ember-changeset-validations#validator-api), or any custom validators that you have written (More on custom validators below).

Each item in a fields `validationRules` array may also include an `arguments` property, where you can pass the arguments relevant to the validator specified by the `validationMethod`.

Thus, the code below taken from the [Ember Changeset Validations usage docs](https://github.com/poteto/ember-changeset-validations#usage) on create a validations map:

```
  firstName: [
    validatePresence(true),
    validateLength({ min: 4 })
  ],
```

would be expressed as the below when defining a formSchema for the changeset-webform component.

```
validationRules: [{
  validationMethod: 'validatePresence',
  arguments: true
}, {
  validationMethod: 'validateLength',
  arguments: { min: 4 }
}]

```

## Example

<Demos::SignupForm />
