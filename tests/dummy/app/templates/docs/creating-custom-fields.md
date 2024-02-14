# Creating custom fields

## Overview

You can create your own custom fields by simply creating a component will all the required markup and behavious, and then adding an entry to `changesetWebformsDefaults.fieldTypes` in `config/environment.js`, where you provide a namepace for the new field, and give the path to the component as `componentPath`. 

## Example

This example is going to create a custom phone number field, which allows the user to select a country code and then type in the rest of the phone number.

The field emits its value is a single string, and will have a custom validator which will check that both the country code and number are present, and that the number is formatted correctly.

<Demos::CustomFieldExample />


## Config

We add an entry to the `ENV.changesetWebformsDefaults.fieldTypes` array in our config file, with a fieldType of `phoneNumberWithCountryCode`. The only other required field is `componentPath`, the path to our custom field component, but we can add any other default field options that we would like to. 

In this case we add some default class names to the `fieldControls` element which wraps all fields. See <LinkTo @route="docs.configure-classnames">docs/configuring-classnames</LinkTo>. 

We also add class name defaults for `phoneNumberInput` and `countryCodeTrigger`. We will tell out component which element these classnames should apply to by adding the `dynamic-class-names` helper below.

<DocsSnippet @name="app-wide-field-options.js" @title="Config" />

## Creating the custom field

The important thing to note here is that your component can be absolutely anything that you want it to, and can call `this.args.updateFieldValue` in order to update the field and the underlying changeset property.

For fine grained control of when the fields validation should become activated, you can also call `this.args.onUserInteraction` in response to any user interaction events you choose.

<Demos::CustomField />

## The component template

The component template simply inserts a [Power Select](https://ember-power-select.com) component for selecting the country code, and then a text input for entering the rest of the phone number. 

### Accessing field value

The value of the field, as derived from the underlying changeset property, can be accessed as the `fieldValue` property of ther form field. 

In the example below, we use the getter `fieldValueObject` to create an object out of `this.args.formField.filedValue`, as different form elements contain different parts of the value. For example, the input's value is set to `this.fieldValueObject.phoneNumber`.

### Handling browser events

In response to the relevant browser events, the two power select and input call the following component actions:

* `codeSelected`
* `inputFocusOut`
* `inputFocusIn`
* `inputKeyUp`
* `inputChange`

### Inserting dynamic class names

Notice the use of the `ember-changeset-webforms/dynamic-class-names`, both as `@triggerClass` on the power select, and `class` on the input. The example below would output the classnames found in `classNames.countryCodeTrigger` in the fields options, because `countryCodeTrigger` is the first argument passed to the helper.

```handlebars
@triggerClass="{{ember-changeset-webforms/dynamic-class-names
  'countryCodeTrigger'
  @changesetWebform
  @formField
}}"
```

Of course you could hard code the class names into your template if you don't care about having the option to override them, but doing it this way gives you the ability to override these class names in any particular usage of the field. 

This is especially helpful if your creating your cusrtom fielsd in an addon, as the consuming app could then override these settings at at app wide level as well.

### Other attributes

In some cases the attributes of a form element in your custom field may have corresponsing field properties. 

For example, the phone number input uses formField properties to set attribute sint he following way:

```handlebars
readonly={{@formField.readonly}}
disabled={{@formField.disabled}}
required={{@formField.required}}
name={{concat @formField.name "-phone-number-input"}}
```

### Accessibility

In our example, both the power select component and the input have the following aria properties added:

```handlebars
ariaLabelledBy={{@ariaLabelledBy}}
aria-label={{@ariaLabel}}
aria-errormessage={{@ariaErrorMessage}}
aria-describedby={{@ariaDescribedBy}}
```

These are passed into the component for you, and you only need to add them to the relevant elements in your custom field, exactly as they appear above. The field label, description and error elements of the field will automatically have the corresponding ids, allowing all the the above attrionutes to work correctly with screen readers.

### Focussing and unfocussing the field

At any point your component can set `this.args.formField.focussed` equal to `true` or `false`. Unless the fields `showValidationWhenFocussed` property is true, all validation UI will be hidden on the field for as long as the fields `focussed` property is `true`.

In the example below, we set `focussed` to true when the text input is focussed.

## Action handling

### updateFieldValue

In order to update the value of the field, you must call `this.args.updateFieldValue` passing the new field value as the only argument. This has several knock on effects, including 
* updating the associated property on the changeset
* adding `valueUpdated` to the eventLog of the field
* triggering field validation, 
* triggering the external `onFieldValueChange` action. // TODO link

In our example, we call this action from 3 different component actions:

* `inputKeyUp`, and  `inputChange` which are in turn bound to the inherent "change" and "keyup" input event via the `on` modifer.
* `codeSelected` which is bound to the `onChange` property of the power select component.

In each case, the value sent as the only argument is the string returned by `updatedFieldValue`, which updates either the countryCode or phoneNumber and returns the concatenated string.

### onUserInteraction

Your custom field component can optionally also call `this.args.onUserInteraction` in response to any user events of your choosing. It takes the following arguments:
* `eventName` - required - any string. This string will be added to the `eventLog` array of the field, and if the same event name is included in the fields `validatesOn` array, then validation will be activated for the field.
* `value` - optional - the value of the individual element that the event has occurred on. For custom fields with multiple form elements this may not be the value of the field  as a whole.
* `event` - optional - the browser event object. 

Calling `this.args.onUserInteraction` from your custom field will also trigger the external `onUserInteraction` action // TODO link.

In our example `this.args.onUserInteraction` is called 3 times, with the only argument being one of `keyUpPhoneNumberInput`, `focusOutPhoneNumberInput`, or `countryCodeSelected`.

This means that is any of `keyUpPhoneNumberInput`, `focusOutPhoneNumberInput`, or `countryCodeSelected` are include in the `validatesOn` array of the field definition where the field is added to a form schema, the fields validation will be activated as soon as `this.args.onUserInteraction` with the corrtesponding argument.

In the usage example below, we see that `focusOutPhoneNumberInput` is the only string in the `validatesOn` array for the `phoneNumber` field. This means that:
* the field does not validate if the user first selects a country code. This avoids an annoying validation error about requiring the phone number before the user has had a chance to fill it in.
* the field validates when the user focusses out of the input, whether there is any text entered or not.
* once a fields validation is activated by a focus out event, it will revalidate whenever it's value is changed, including when a new country code is selected.

## Usage

The new field can then be used as any other field, as in the example below.

<Demos::CustomFieldUsage />


