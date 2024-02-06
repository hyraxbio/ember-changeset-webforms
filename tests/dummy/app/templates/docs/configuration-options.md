## App wide configuration


### Default form settings 

App wide defaults for form settings can be overridden in the `ENV.changesetWebformsDefaults.formSettings` object in `config/environment.js` in your consuming Ember app.

The internal defaults are as below.

<DocsSnippet @name="form-settings-options.js" />

The above options can also be for all the fields in a particular form in the `settings` object in your `formSchema`.

In the example below, `submitButtonText` is set to `Sign in` as a form specific option.

<Demos::FieldSettingsOverriddenOne />

### Default field settings

These options are agnostic of the field type, and apply to any field.

App wide defaults for field settings can be overridden in the `ENV.changesetWebformsDefaults.fieldSettings` object in `config/environment.js` in your consuming Ember app.

The internal defaults are as below.

<DocsSnippet @name="generic-field-settings.js" @title="Default field settings"/>

The above options can also be for all the fields in a particular form in the `fieldSettings` object in your `formSchema`.

The above options van be further overridden in the definition of any particular field.

In the example below, `hideLabel` is set to `true` as a form specific default, but is overridden to `true` in the email field. Thus, the labels are hidden on all but the email field.

<Demos::FieldSettingsOverridden />
