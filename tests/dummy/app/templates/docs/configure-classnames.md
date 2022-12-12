# Configuring element class names

The addon provides fine grained control over the class names that are applied to the elements which are rendered within the `ChangesetWebform` component.

The snippet below shows the full list of configurable class names, as well the their internal defaults. The keys describe which elements the relevant arrays of class names are applied to.

{{docs-snippet name="configurable-classnames.js" title="Internal class name defaults"}}

Any of these keys can be overridden at the app level, in the `ENV.changesetWebformsDefaults.generalClassNames` object in `config/environment.js` in your consuming Ember app.

App wide defaults can in turn be overridden in any particular instance of the `ChangesetWebform` component, in the `formSchema.generalClassNames` object. These settings will then apply throughout the particular form.

Form wide settings can further be overridden for an individual form  field using the `classNames` property of the relevant `field` object in `formSchema.fields`.  

## Retaining vs overriding inherited class names

If you want the class names you provide to be added to the default clas names for an element, include `...defaults` in the array as below.

{{docs-snippet name="class-name-config-inherit-defaults.js" title="Retain defaults"}}

Alternatively, exclude `...defaults` in order to completely override the value.

{{docs-snippet name="class-name-config-ignore-defaults.js" title="Override defaults"}}

## Including dynamic validation class names

The class names applied to elements as a result of wither passing or failing validation are defined in the `validClassNames` and `invalidClassNames` properties respectively. The defaults are `is-valid` and `is-invalid`.

You may wish to customise which elements within a form field receive those classes once a field has been validated. This can be done by adding `...validationClassNames` as an class name for any element which should receive those class names. 

{{docs-snippet name="class-name-config-validation-classes.js"}}

