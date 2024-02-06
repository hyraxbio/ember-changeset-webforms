# What is Ember Changset Webforms

**Ember Changset Webforms** integrates convenient, flexible and feature rich templates and action handling with the immensely powerful [Ember Changeset](https://github.com/poteto/ember-changeset) and [Ember Changeset Validations](https://github.com/poteto/ember-changeset-validations).

Simply define a form schema as a "plain old JavaScript object", which includes an array of `fields`, each with options for UI and validation.

This schema can then be passed to the `ChangesetWebform` component in order to render a form, as below. The creation of the changeset, with its associated validators, is handled by the component, so that you need only think about what fields you would like to include in a webform, and how they should be validated.

The component can also accept POJO, Ember object or Ember model as its `@data` property, which will pre-populate the changeset and UI with the relevant values.

## Example


<Demos::SignupForm />

## Features

* Define your form schema as plain old JavaScript object, and the `ChangesetWebform` component will render the form.
* The addon provides 11 default fields, and allows for the creation of custom fields whgich can then easily be used throughout your application.
* You can define a field as clonable, allowing the end user to add or remove instances of the field.
* You have fine grained control over CSS classes at global, form and individual field level.
* The addon integrates all of the validation methods which are part of [Ember Changeset Validations](https://github.com/poteto/ember-changeset-validations) by default, and makes it easy to define and integrate custom validators.
* You can pass an array of validation event names, to control when validation happens for a specific field- these are `keyUp`, `insert`, `focusOut` and `onChange`.
* The addon provides several action hooks, allowing your app to respond to user interactions in various ways.
* Conditional fields - only allow a field to show if another field has a certain value, but updating its `hidden` setting. Fields which are hidden are not validated and they are not included in the data submitted by the form.
* Fine grained configuration control. Configuration options can be set at the app level, form level and, where appropriate, at field level. 
* Configurable CSS class names - configure the classnames applied to form controls such as inputs or buttons, to alow for seamless styling integration with libraries such as Bootstrap.



