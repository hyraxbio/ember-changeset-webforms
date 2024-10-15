# ember-changeset-webforms

[Short description of the addon.]

## Compatibility

- Ember.js v3.12 or below
- Ember CLI v3.12 or above
- Node.js v12 or below

## Installation

```
ember install ember-changeset-webforms
```

## Importing styles

The addon tries to remain as agnostic as possible about styling, however, there are a few styles which aere required. Import them into your `app.scss` file with the following line:

`@import ember-changeset-webformss;`

## Required addons

There are some supporting addons which need to be installed, fpor various components/fieldTypes to work.

See the [Contributing](CONTRIBUTING.md) guide for details.

`ember install ember-power-select`

If the installation does not automatically add these line to your `app.scss` file, then add them, before the line `@import ember-sundries`.

`@import "ember-basic-dropdown";`

`@import "ember-power-select";`

**ember-changeset-webforms/form-field-radio-button-group (fieldType=radioButtonGroup)**

`ember install ember-radio-button`

### Ember changeset validations

`https://github.com/poteto/ember-changeset-validations`

### Ember validations

https://offirgolan.github.io/ember-validators/docs/modules/Validators.html

---

## Form wide defaults

`class`
`formName`
`hideLabels` // false
`hideSuccessValidation` // false
`modelName`
`recordToUpdate`
`clearFormAfterSubmit`
`resetButtonClasses`
`showResetButton`
`submitAsync`
`submitButtonClasses`
`submitButtonText`
`submitDisabled`
`submitSuccessMessage`
`title`

## The `props` property

An object can be passed to the `validating-form` component as `props`.

The object passed can either an Ember model, an Ember object, or a POJO. Where the keys in the object passed to `props` are the same as the `fieldId` of any form fields, those fields will be rendered with the corresponding value.

This is how you would create something like an edit account form, where the user's current settings need to be reflected in the form when it first renders.

### Example

    this.set('formSchema', {
      formSettings: {
        formName: 'signup',
        modelName: 'user',
      },
      fields: [{
          fieldLabel: 'Name',
          fieldId: 'name',
          fieldType: 'input',
          inputType: 'text'
        }
      ]
    };

    this.set('model', {
      name: 'Little Sebastian'
    });

    {{ember-changeset-webforms/validating-form
      formSchema=formSchema
      submitAction=(action submitAction)
      data=model
    }}

In the above case, the form will render with the value _**Little Sebastian**_ in the name field.

### `props` is not for defaults

You should not use `props` to pass default values to form fields- those should be defined in the field schemas. If a field has a default specified, as well as a value from `props`, the value from `props` will win. This way, the default will become the value of the field, in the event that it's value is not set by `props`.

## propsHash

The `propsHash` property exists for the edge case in which you need to update a child property of `props` from outside the form, and you need the value of the form field to be updated accordingly.

    this.set('formSchema', {
      formSettings: {
        formName: 'signup',
        modelName: 'user',
      },
      fields: [{
          fieldLabel: 'Name',
          fieldId: 'name',
          fieldType: 'input',
          inputType: 'text'
        }
      ]
    };

    this.set('model', {
      name: 'Little Sebastian'
    });

    {{ember-changeset-webforms/validating-form
      formSchema=formSchema
      submitAction=(action submitAction)
      data=model
    }}

If an action outside of the form replaces the `model` object entirely, the form will update accordingly. For example, the code below would update the value of the name field to _**Ron Swanson**_.

    this.set('model', {
      name: 'Ron Swanson'
    });

However, updating a child property of model will have no effect.

    this.set('model.name', Lelsey Knope');

The field value will not update to _**Lesley Knope**_. Note that the below will also **not** work:

    var object = this.model;
    object.name = 'Lesley Knope';
    this.set('model', object);

This is because Ember recognises that `object` is just an expression of the model, and so it only registers a change to the child property `name`.

If you need to be able to update individual properties from outside the form, you can pass a hash to `propHash`.

    this.set('model', {
      name: 'Little Sebastian'
    });

    {{ember-changeset-webforms/validating-form
      formSchema=formSchema
      submitAction=(action submitAction)
      data=model
      propHash=(
        name=model.name
      )
    }}

Initially, the the form will render with the value _**Little Sebastian**_ in the name field, as above. However, in this case setting `model.name` will update the value of the name field.

    this.set('model.name', 'Ron Swanson');

The value of the name field will now be _**Ron Swanson**_.

Note that the keys and values of `propsHash` should correspond to `props`.

Note that `propsHash` can accept nested hashes.

    {{ember-changeset-webforms/validating-form
      formSchema=formSchema
      submitAction=(action submitAction)
      data=model
      propHash=(
        name=model.name
        info=(hash
          phone_number=model.info.phone_number
        )
      )
    }}

In this case `this.set('model.info.phone_number', '555')` will update the value of the field with a fieldId of `info.phone_number` to _**555**_.

## Field properties - all fields

`autoFocus` Auto focusses the input on insertion when `true`. Default `false`.
`defaultValue` Set the value of the field to this when rendering it. Note that this will be overriden by the value of a `props` object where relevant.

## Field properties - specific fields

### input

`notrim` Input fields are trimmed by default, unless they are type `password`, or you set `notrim` to true.

### checkbox group

Default layout is vertical.
Include `horizontal` in `fieldClasses` for a horizontal layout.

## Additional

Note `skipValidation` will skip validation even if rules are present. You would only use this to turn off validation based on some other state of the form- otherwise you would just not include any validation rules for the field.

`castOut` invokes `changeset.cast`. Note that this will revert any changes in your form to the value that was first given to the changeset. Note the implications for pre loaded models, eg in an edit account form- castOut will not remove the field altogether, it will just revert the value to what was originally loaded. This is technically correct, because not submitting that field should leave it alone, rather than overwrite it with null.

`validateFields` and `nullifyExcludedFields` are utils that user can incoke for special cases.

Note exactly how `customValidators` work.

Test that resetting form works and allows subsequent form submission correctly.

Note `notrim` in docs.

Note `dataTestId` for form fields. First takes `dataTestId` in template, then `formField.dataTestId`, then combines `validating-form-` with `formField,fieldId`.

## Action callbacks

### Form

`afterFieldValidation`

Runs after any field is validated.

```
afterFieldValidation(validationResponse, formField, changeset, formFields, formSettings) {
  ...
}
```

`onFieldValueChange`

Runs after any property in `changeset.data` is updated- ie when any field is edited by the user. Runs before the relevant field is validated.

```
this.onFieldValueChange(formFields, fieldId, formSettings, changeset, snapshot) {
  ...
}
```

### Field

`onFieldValueChange`

Runs after the value of the data property of the changeset is updated, but before the field is validated.

```
this.onFieldValueChange(fieldId, changeset, formField) {
  ...
}
```

`afterFieldValidation`

Runs after the field is validated.

```
afterFieldValidation(validationResponse, formField, changeset) {
  ...
}
```

formField.datepickerPlaceholder for power-datetime-picker formfield.

Default search placeholder for power select referenced in:
addon/templates/components/ember-changeset-webforms/form-field-power-select.hbs

Test: nullifyExcludedFields allows in changeset.set keys that are not in the formSchema, but still rejects those who have a related field which is hidden or castOut. Must take into accouhnt all keys in both changeset.data and changeset.changes.
