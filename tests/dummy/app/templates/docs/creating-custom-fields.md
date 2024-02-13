# Creating custom fields

## Overview

You can create your own custom fields by simply creating a component will all the required markup and behavious, and then adding an entry to `changesetWebformsDefaults.fieldTypes` in `config/environment.js`, where you provide a namepace for the new field, and give the path to the copmponent as `componentPath`. 

## The onChange action

In order to update the value of the field, you must call `this.args.onChange` passing the new field value as the only argument. This has several knock on effects, including 
* updating the associated proeprty ont he changeset
* triggering validation, 
* triggering external `onFieldValueChange` action, if it was passed to the `ChangesetWebform` component.

## The onUserInteraction action

Your custom field component can optionally also call `this.args.onUserInteraction` action. This will give you fine grained control over which events should trigger validation, and this control can be defined in your consuming `formSchema` object.


also available as `this.args.onUserInteraction` when the user interacts with the form in a particular way. It takes `eventType` as its only argument.

`eventType` is simply a string, and can be anything that you choose. The significance of `eventType` is that if the ssame string is included in the `validatesOn` array for the field definition in the form schema, then the field's validation will become active and visible when the `onUserInteraction` is fired.

In the example below `countryCodeSelected` i


<DocsSnippet @name="app-wide-field-specific-classes.js" @label="Config" />

<Demos::CustomField />

Creating custom fields content

** Make sure it knows what to do if disabled.

Emit the userInteraction actions with eventType

id={{this.formField.id}}
ariaLabelledBy={{this.ariaLabelledBy}}
aria-label={{this.ariaLabel}}

