# Field settings

## Generic field settings

Generic field settings are those which apply to all form fields, regardless of the type of field or the internal markup which is rendered within it.

The default settings are listed below with their values.

Generic field settings can be tweaked for all the fields in one instance of a `changesetWebform` component, in the `fieldSettings` object at the root of your formSchema.

Note that any of these settings can be overridden in one of the field objects in the `formSchema.fields` array.

<DocsSnippet @name="generic-field-settings.js" @title="Default generic field settings and their values" />

## Tracked field settings

The following field settings are tracked, and so updating them in an action will result in a template update. 

<DocsSnippet @name="field-settings-tracked-props.js" @title="Tracked field settings" />

## Custom tracked props

If you need to add custom tracked properties to a field, you can add them to a class definition, adding any tracked properties to that class definition.

Then add an instance of that class as the `externalProps` property of a formField or formFieldClone.

// TODO test and document this better.

In the example below, we need a tracked property `showAdvanced` in ourt form field, so that we can update the custom clicker component to toggle between an up and down arrow when the button is clicked.

In the case we've created a class definition called `customProps` with a tracked property of `showAdvanced`.

<Forms::ClickerExampleTwoFormSchema />


