# Configuring element class names

The addon provides fine grained control over the class names that are applied to the elements which are rendered within the `ChangesetWebform` component.

## Addon defaults

The snippet below shows the full list of configurable class names, as well the their internal defaults. The keys describe which elements the relevant arrays of class names are applied to.

{{docs-snippet name="configurable-classnames.js" title="Internal class name defaults"}}

## Where to customise class name settings

The settings above can be customised in three places, listed below from lowest to highest preference.

* App wide class name settings can be set in the `ENV.changesetWebformsDefaults.generalClassNames` object in `config/environment.js` in your consuming Ember app.
* App wide defaults can in turn be overridden in any particular instance of a `ChangesetWebform` object, in `generalClassNames` property of your `formSchema`. These settings will then apply throughout the particular form.
* Form wide settings can further be overridden for an individual form  field using the `classNames` property of the relevant `field` object in `formSchema.fields`.  

## How to customise class name settings

Find the prop in the default class names settings which corresponds to element whose class names you would like to set. The property names used are chosen to point out the elements they affect as best as possible.

### Passing an array of strings

This is sufficient for elements with static class names.
### Inheriting vs overriding class names settings from higher levels

Include the string `$inherited` in the array of class names for an element as a placeholder for the class names inherited from the next level up.

{{docs-snippet name="class-name-config-inherit-defaults.js" title="Retain defaults"}}

Alternatively, exclude `$inherited` in order to completely override the value.

{{docs-snippet name="class-name-config-ignore-defaults.js" title="Override defaults"}}

### Including dynamic validation class names

The class names applied to elements as a result of wither passing or failing validation are defined in the `validClassNames` and `invalidClassNames` properties respectively. The defaults are `is-valid` and `is-invalid`.

You may wish to customise which elements within a form field receive those classes once a field has been validated. This can be done by adding `$validationClassNames` as an class name for any element which should receive those class names. 

{{docs-snippet name="class-name-config-validation-classes.js"}}
### Passing a function

If you would one or more class names for an element to be dynamic, you can pass a function instead of an array of class name strings. The function receives 2 arguments, `classNameSettings`, `changesetWebform` and `formField`.

Note in the "Internal class name defaults" above how `submitButtonIcon` is a function which alters the class names based on whether `changesetWeform.formSettings.requestInFlight` is true.

Note also that `classNameSettings` in this context is the fully resolved set of class names, 





