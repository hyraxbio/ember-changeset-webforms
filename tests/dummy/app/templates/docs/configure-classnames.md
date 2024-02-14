# Configuring element class names

The addon provides fine grained control over the class names that are applied to the various elements which are rendered within the `ChangesetWebform` component. 

This allows you to fit the markup of your forms to an existing CSS library without overriding any template files.

## Default classnames

The snippet below shows the full list of configurable class names, as well the their internal defaults.

The value of each class name property must be an array or a function.

Each property name is chosen to indicate which element it targets.

These properties can be modified at the app, form and field level, as outlined below.

<DocsSnippet @name="configurable-classnames.js" @title="Internal class name defaults" />

## Customising class names for an element throughout your app

App wide class name settings can be set in the `ENV.changesetWebformsDefaults.generalClassNames` object in `config/environment.js`.

For example, the snippet below would add the class `label-el` to all label elements rendered by the `ChangesetWebform` component. 

<DocsSnippet @title="config/environment.js" @name="app-wide-classes.js" />

## Customising class names for an element throughout your app, but only within in a specific type of form field

App wide class name settings for a specific type of field can be set by adding an object for the relevant field type `ENV.changesetWebformsDefaults.fieldTypes` array in `config/environment.js`. This object can then have a `classNames` array where class names can be set.

For example, the snippet below would add the class `radio-button-group-label` to label elements rendered in all `radioButtonGroup` fields throughout the app.

<DocsSnippet @title="config/environment.js" @name="app-wide-field-options.js" />

The {{this.fieldTypes.length}} built in fields have the following `fieldTypes`:

<ul>
{{#each this.fieldTypes as |fieldType|}}
  <code style="display: inline-block; margin: 0 20px 10px 0;">{{fieldType}}</code>
{{/each}}
</ul>

The two snippets from `config/environment.js` above, result in the following class names on the two label elements in the form below.

<Demos::FieldSettingsOverridden />

## Customising class names for an element throughout a single instance of the ChangesetWebform component

Class names can be customised within any particular instance of a `ChangesetWebform` object, in the `generalClassNames` property of `formSchema`. These settings will then apply throughout the particular form.

<Demos::FormWideClassSettings />

## Customising class names for an element in a specific instance of a form field

Class names can be customised for an individual form field using the `classNames` property of the relevant `field` object in `formSchema.fields`. 

<Demos::FieldSpecificClassSettings />

## Inheriting vs overriding class names settings from higher levels

Include  `$inherited` in the array of class names for an element as a placeholder for the class names inherited from the next level up.

<Demos::InheritClassSettings />

Alternatively, exclude `$inherited` in order to completely override the value.

<Demos::OverrideClassSettings />

## Including dynamic validation class names

The class names applied to elements as a result of wither passing or failing validation are defined in the `validClassNames` and `invalidClassNames` properties respectively. The defaults are `is-valid` and `is-invalid`.

You may wish to customise which elements within a form field receive those classes once a field has been validated. This can be done by adding `$validationClassNames` as an class name for any element which should receive those class names. 

<Demos::ValidationClassSettings />
## Passing a function for dynamic class names
<!-- TODO document when this runs -->

If you would one or more class names for an element to be dynamic, you can pass a function instead of an array of class name strings. The function receives 2 arguments, `classNameSettings`, `changesetWebform` and `formField`.

Example

{{#docs-snippet name="class-names-function.js"}}
submitButtonIcon(classNameSettings, changesetWebform, formField) {
  if (changesetWebform.formSettings.requestInFlight) {
    return classNameSettings.requestInFlight;
  }
}
{{/docs-snippet}}

<Docs::ShowClasses />


