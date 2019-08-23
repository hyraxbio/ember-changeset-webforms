ember-pojo-validating-fields
==============================================================================

[Short description of the addon.]

Installation
------------------------------------------------------------------------------

```
ember install ember-pojo-validating-fields
```

## Importing styles

The addon tries to remain as agnostic as possible about styling, however, there are a few styles which aere required. Import them into your `app.scss` file with the following line:

`@import ember-pojo-forms;`

## Required addons

There are some supporting addons which need to be installed, fpor various components/fieldTypes to work.

**ember-pojo-form/form-field-checkbox-group (fieldType=checkboxGroup)**
**ember-pojo-form/form-field-checkbox (fieldType=singleCheckbox)**

`ember install ember-extended-elements`

Add the following line to your app.scss file, before `@import ember-pojo-forms`

`@import ember-extended-elements;`

**ember-pojo-form/form-field-date-range (fieldType=dateRange)**
**ember-pojo-form/form-field-power-datepicker (fieldType=powerDatePicker)**

`ember install ember-power-calendar`

If the installation does not automatically add this line to your `app.scss` file, then add it, before the line `@import ember-extended-elements`.

`@import "ember-power-calendar";`

**ember-pojo-form/form-field-power-select (fieldType=powerSelect)**
**ember-pojo-form/form-field-tag-selector (fieldType=tagSelector)**

`ember install ember-power-select`

If the installation does not automatically add these line to your `app.scss` file, then add them, before the line `@import ember-extended-elements`.

`@import "ember-basic-dropdown";`

`@import "ember-power-select";`

**ember-pojo-form/form-field-radio-button-group (fieldType=radioButtonGroup)**

`ember install ember-radio-button`
