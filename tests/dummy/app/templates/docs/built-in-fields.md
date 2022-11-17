

The value of a field will set the property in the underlying changeset at the path defined as `propertyName` or `fieldId`.

## Input

Renders an HTML input. 

Calls the `keyUp`, `focusIn` and `focusOut` actions when the corresponding events occur.

### Input field props

{{docs-snippet name="input-field-options.js"}}

{{#docs-demo as |demo|}}
  {{#demo.example name="input-example-1.hbs"}}
    <ChangesetWebform @formSchema={{inputExample1FormSchema}} 
    @onUserInteraction={{action "onUserInteraction" }}/>
  {{/demo.example}}
  {{demo.snippet "input-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "input-example-1.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name="input-example-2.hbs"}}
    <ChangesetWebform @formSchema={{inputExample2FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "input-example-2.js" label="Component JS" language="javascript"}}
  {{demo.snippet "input-example-2.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

## Textarea

Renders an HTML textarea. 

Calls the `keyUp`, `focusIn` and `focusOut` actions when the corresponding events occur.

### Textarea field props

{{docs-snippet name="textarea-field-options.js"}}

{{#docs-demo as |demo|}}
  {{#demo.example name="textarea-example-1.hbs"}}
    <ChangesetWebform @formSchema={{textareaExample1FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "textarea-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "textarea-example-1.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}
## Single checkbox

Renders a single checkbox with a label.

The field ID is set to `true` or `false` depending on whether the checkbox is checked or not.

### Single checkbox props

{{docs-snippet name="singleCheckbox-field-options.js"}}

### Single checkbox basic usage

{{#docs-demo as |demo|}}
  {{#demo.example name="single-checkbox-example-1.hbs"}}
    <div data-test-id="single-checkbox-basic-use">
      <ChangesetWebform @formSchema={{singleCheckboxExample1FormSchema}} />
    </div>

  {{/demo.example}}
  {{demo.snippet "single-checkbox-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "single-checkbox-example-1.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

### Single checkbox markdown checkbox label

You can also pass a markdown string to the `checkboxLabelMarkdown` prop. This will bne rendered as HTML inside a `label` element.

{{#docs-demo as |demo|}}
  {{#demo.example name="single-checkbox-example-2.hbs"}}
    <div data-test-id="single-checkbox-markdown-label">
      <ChangesetWebform @formSchema={{singleCheckboxExample2FormSchema}} />
    </div>

  {{/demo.example}}
  {{demo.snippet "single-checkbox-example-2.js" label="Component JS" language="javascript"}}
  {{demo.snippet "single-checkbox-example-2.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

### Single checkbox custom component for checkbox label

You can use a custom component for the checkbox label by passing `checkBoxLabelComponent` to the field. The component passed will then be rendered in place of the standard label element for each option.

The object passed must take the following form.

``` 
{ 
  path: // String, required. The path to the component to render', 
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

* The component will also have access to an `option` prop, with the data for that option.
* The component will also have access to the `checkboxId` property. Set the label elements `for` attribute to this value to match it to the related checkbox.

{{#docs-demo as |demo|}}
  {{#demo.example name="single-checkbox-example-3.hbs"}}
    <div data-test-id="single-checkbox-component-label">
      <ChangesetWebform @formSchema={{singleCheckboxExample3FormSchema}} />
    </div>

  {{/demo.example}}
  {{demo.snippet "single-checkbox-example-3.js" label="Component JS" language="javascript"}}
  {{demo.snippet "single-checkbox-example-3.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

## Radio button group

Renders a radio button group. The value of the field as a whole is the `value` property of the currently selected option.

### Radio button group props

{{docs-snippet name="radioButtonGroup-field-options.js"}}

### Radio button group `options` prop

Each option in the `options` property of field with type `radioButtonGroup` can have the following properties.

{{docs-snippet name="radio-button-group-option.js"}}

{{#docs-demo as |demo|}}
  {{#demo.example name="radio-button-group-example-1.hbs"}}
    <ChangesetWebform @formSchema={{radioButtonGroupExample1FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "radio-button-group-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "radio-button-group-example-1.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

### Custom components for Radio button group options

When using a custom component for option labels, either by:

* passing `optionLabelComponent` to the field. The component passed will then be rendered in place of the standard label element for each option.
* by passing `labelComponent` to a specific option. The component passed will then be rendered in place of the standard label element for that specific option, and will override `optionLabelComponent`.

In both cases the following applies, the object passed must take the following form.

``` 
{ 
  path: // String, required. The path to the component to render', 
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

* The component will also have access to an `option` prop, with the data for that option.
* The component will also have access to the `radioId` property. Set the label elements `for` attribute to this value to match it to the related checkbox.

{{#docs-demo as |demo|}}
  {{#demo.example name="radio-button-group-example-2.hbs"}}
    <ChangesetWebform @formSchema={{radioButtonGroupExample2FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "radio-button-group-example-2.js" label="Component JS" language="javascript"}}
  {{demo.snippet "radio-button-group-example-2.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

## Checkbox group

Renders a checkbox group. The value of the field as a whole is an array which will include the value of `key` for each option that is currently selected.

{{docs-snippet name="checkboxGroup-field-options.js"}}

### Checkbox group options

Each option in the `options` property of field with type `checkboxGroup` can have the following properties.

{{docs-snippet name="checkbox-group-option.js"}}

{{#docs-demo as |demo|}}
  {{#demo.example name="checkbox-group-example-1.hbs"}}
    <ChangesetWebform @formSchema={{checkboxGroupExample1FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "checkbox-group-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "checkbox-group-example-1.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

### Custom components for Checkbox group options

When using a custom component for option labels, either by:

* passing `optionLabelComponent` to the field. The component passed will then be rendered in place of the standard label element for each option.
* by passing `labelComponent` to a specific option. The component passed will then be rendered in place of the standard label element for that specific option, and will override `optionLabelComponent`.

In both cases the following applies, the object passed must take the following form.

``` 
{ 
  path: // String, required. The path to the component to render', 
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

* The component will also have access to an `option` prop, with the data for that option.
* The component will also have access to the `checkboxId` property. Set the label elements `for` attribute to this value to match it to the related checkbox.

{{#docs-demo as |demo|}}
  {{#demo.example name="checkbox-group-example-2.hbs"}}
    <ChangesetWebform @formSchema={{checkboxGroupExample2FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "checkbox-group-example-2.js" label="Component JS" language="javascript"}}
  {{demo.snippet "checkbox-group-example-2.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}



{{docs-snippet name="clicker-field-options.js"}}

    this.staticContentExample1FormSchema = {

## Static content field

This field can be used to static content in a form. It has no action handlers.

If static text is sufficient, you can simply use the `text` prop to pass the static text to display, and the `textElement` prop to specify what element the text should be wrapped in.

{{#docs-demo as |demo|}}
  {{#demo.example name="static-content-example-1.hbs"}}
    <div data-test-id="static-content-basic-use">
      <ChangesetWebform @formSchema={{staticContentExample1FormSchema}} />
    </div>
  {{/demo.example}}
  {{demo.snippet "static-content-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "static-content-example-1.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

### Static content field with custom content component

{{#docs-demo as |demo|}}
  {{#demo.example name="static-content-example-2.hbs"}}
    <div data-test-id="static-content-custom-content-component">
      <ChangesetWebform @formSchema={{staticContentExample2FormSchema}} />
    </div>
  {{/demo.example}}
  {{demo.snippet "static-content-example-2.js" label="Component JS" language="javascript"}}
  {{demo.snippet "static-content-example-2.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

Alternatively, you can pass `

{{docs-snippet name="staticContent-field-options.js"}}

## Power select

Renders an [ember-power-select](https://ember-power-select.com) component.

### Power select field props

{{docs-snippet name="powerSelect-field-options.js"}}

Note also that if passed, value of `placeholder` will display as the placeholder in the select box until an option is selected.

### Power select where options is an array of strings

{{#docs-demo as |demo|}}
  {{#demo.example name="power-select-example-1.hbs"}}
    <ChangesetWebform @formSchema={{powerSelectExample1FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "power-select-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-select-example-1.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

### Power select where options is an array of objects

Where an array of objects is passed to `options`, `optionDisplayProp` must be set to tell the power select component which property to use as the display for both the options in the list, the display of the selected item and the propertuy to target when searching the list.

In the example below, the user only sees the country names, but the value of the field will be set to an object with the country ID and name when a country is selcted.

{{#docs-demo as |demo|}}
  {{#demo.example name="power-select-example-2.hbs"}}
    <ChangesetWebform @formSchema={{powerSelectExample2FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "power-select-example-2.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-select-example-2.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

### Power select with custom components for the options and selected item

In this scenario, we want the actual value of the field to be the 3 letter country code, but we want only ever want user to see the full country name. 

We thus pass an array of country code strings as options, but then use custom components for the selected item and options to show the full country name for each ID.

When the user clicks a country name, the value of the field will be set to the 3 letter id.

{{#docs-demo as |demo|}}
  {{#demo.example name="power-select-example-3.hbs"}}
    <ChangesetWebform @formSchema={{powerSelectExample3FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "power-select-example-3.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-select-example-3.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}
### Power select with multiple selection

Passing `multipleSelection: true` will render a [Power select multiple component](https://ember-power-select.com/docs/multiple-selection).

{{#docs-demo as |demo|}}
  {{#demo.example name="power-select-multiple-example-1.hbs"}}
    <div data-test-id="power-select-multiple-selector-example-1">
      <ChangesetWebform @formSchema={{powerSelectMultipleExample1FormSchema}} />
    </div>
  {{/demo.example}}
  {{demo.snippet "power-select-multiple-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-select-multiple-example-1.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}
## Power datepicker

Displays an input which shows the current selected date or datetime. When the input is focussed, a dropdown shows, including an [Ember Power Calendar](https://ember-power-calendar.com) component, and optionally a time selection component below that. 

The datetime can be updated by simply editing the string in the trigger input, or bu using the calendar component, and the time selector component is it is shown. 

The `dateTimeFormat` option is important. This is the format which will be used by momentjs to parse any dates being passed to the field, wither by setting `defaultValue` on the field,or if it is passed as past of the `data` object to the `changesetWebform` component. 

The value output by this field will also always be a formatted according to this format.

### Power datepicker field props

{{docs-snippet name="powerDatePicker-field-options.js"}}

### Basic usage - date only selection

{{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-1.hbs"}}
    <div data-test-id="power-datepicker-basic-use">
      <FormattedDatetimes @data={{dateTimeOutput1}} />
      <ChangesetWebform 
        @formSchema={{powerDatapickerExample1FormSchema}}
        @afterFieldEdit={{action "afterDatetimeUpdated" "1"}} />
    </div>
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-1.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "after-datetime-updated-action.js" label="Action handing" language="javascript"}}
{{/docs-demo}}

### With fixed time

`fixedTime` can be passed in the format `HH:mm:ss.SSS`. When present, the time portion of the field values will be fixed to this value.

Note that setting `showTimeSelector` to`true` will have no effect if `fixedTime` is passed.

{{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-1b.hbs"}}
    <div data-test-id="power-datepicker-advanced-use">
      <FormattedDatetimes @data={{dateTimeOutput1b}} />
      <ChangesetWebform 
        @formSchema={{powerDatapickerExample1bFormSchema}}
        @afterFieldEdit={{action "afterDatetimeUpdated" "1b"}} />
    </div>
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-1b.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-1b.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "after-datetime-updated-action.js" label="Action handing" language="javascript"}}
{{/docs-demo}}

### With minDate and maxDate

`minDate` and `maxDate` can both be passed in order to set the earliest and latest allowed dates respectively. In the calendar component, all dates before `minDate` or after `maxDate` will be disabled. 

If the user types a date into the trigger input which is before `minDate` or after `maxDate`, then when the `onChnage` event fires, the value will be ignored and the trigger will be reset to its previous value.

{{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-1c.hbs"}}
    <div data-test-id="power-datepicker-min-max-date">
      <FormattedDatetimes @data={{dateTimeOutput1c}} />
      <ChangesetWebform 
        @formSchema={{powerDatapickerExample1cFormSchema}}
        @afterFieldEdit={{action "afterDatetimeUpdated" "1c"}} />
    </div>
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-1c.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-1c.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "after-datetime-updated-action.js" label="Action handing" language="javascript"}}
{{/docs-demo}}

### With time selector using default units

If `showTimeSelector` is `true` then by default a series of inputs will be shown for time selection, based on a 24 hours clock with hours, minutes, seconds and milliseconds.

All inputs can be updated either by typing numbers, or by using the arrow keys. 

* An arrow key on its own increments the value by 1.
* An arrow key + `Shift` increments the value by 10.
* An arrow key + `Ctrl` + `Shift` increments the value by 100.

If the user input exceeds the maximum value for the relevant time unit, the value will be forcibly set to the maximum value. 

If the user input is lower than the minimum value for the relevant time unit, the value will be forcibly set to the minimum value. 

{{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-3.hbs"}}
    <div data-test-id="power-datepicker-24-hour-time-select">
      <FormattedDatetimes @data={{dateTimeOutput3}} />
      <ChangesetWebform 
        @formSchema={{powerDatapickerExample3FormSchema}}
        @afterFieldEdit={{action "afterDatetimeUpdated" "3"}} />
    </div> 
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-3.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-3.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "after-datetime-updated-action.js" label="Action handing" language="javascript"}}
{{/docs-demo}}

### With time selector using custom format

`timeSelectorFields` can be passed as a comma separated string of [valid momentjs hour, minute, second, or millisecond tokens](https://momentjs.com/docs/#/parsing/string-format/).

The related fields will be displayed in the order that they are listed.

The example below shows a time selector component with just hours and minutes.

{{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-3a.hbs"}}
    <div data-test-id="power-datepicker-custom-time-select">
      <FormattedDatetimes @data={{dateTimeOutput3a}} />
      <ChangesetWebform 
        @formSchema={{powerDatapickerExample3aFormSchema}}
        @afterFieldEdit={{action "afterDatetimeUpdated" "3a"}} />
    </div> 
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-3a.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-3a.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "after-datetime-updated-action.js" label="Action handing" language="javascript"}}
{{/docs-demo}}

### With time selector using 12 hour format

If `h` or `hh` is passed as the hour format for the time selector component, the hour input will accept values from 1 - 12, and an AM/PM input will be shown as well.

The AM/PM input can be updated wither by typing in the input, or using arrow up to select AM or arrow down to select PM.

{{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-4.hbs"}}
    <div data-test-id="power-datepicker-12-hour-time-select">
      <FormattedDatetimes @data={{dateTimeOutput4}} />
      <ChangesetWebform 
        @formSchema={{powerDatapickerExample4FormSchema}}
        @afterFieldEdit={{action "afterDatetimeUpdated" "4"}} />
    </div>
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-4.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-4.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "after-datetime-updated-action.js" label="Action handing" language="javascript"}}
{{/docs-demo}}

### With a different display format from the underlying date value format

It is possible pass `dateTimeDisplayFormat` to have a different display format in the datetime trigger input, to the underlying date format specified by `dateTimeFormat`. 

In this case, the field value will still be formattd according to `dateTimeFormat`. `dateTimeFormat` will still be the format which will be used by momentjs to parse any dates being passed to the field, wither by setting `defaultValue` on the field,or if it is passed as past of the `data` object to the `changesetWebform` component.  

This could be useful where your server requires one date format, but your users would expect another format.

{{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-5.hbs"}}
    <div data-test-id="power-datepicker-unusual-format">
      <FormattedDatetimes @data={{dateTimeOutput5}} />
      <ChangesetWebform 
        @formSchema={{powerDatapickerExample5FormSchema}}
        @afterFieldEdit={{action "afterDatetimeUpdated" "5"}} />
    </div> 
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-5.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-5.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "after-datetime-updated-action.js" label="Action handing" language="javascript"}}
{{/docs-demo}}

## Clicker

The field displays an element which emits the `onUserInteraction` action with the eventType `click` when clicked. You can bind this to an action in your component and then respond in any way.

The examples below toggle the advanced field in a form.

## Clicker field basic usage

Pass `clickerText` and optionally `clickerElementClassNames`.

Renders a `div` element with `role="button"` the classNames provided. The inner text of the element is what is passed to `clickerText`.

{{#docs-demo as |demo|}}
  {{#demo.example name="clicker-example-1.hbs"}}
    <div data-test-id="clicker-example-1">
      <ChangesetWebform 
        @formSchema={{clickerExample1FormSchema}} 
        @onUserInteraction={{action "onUserInteractionClicker1"}}/>
    </div> 
  {{/demo.example}}
  {{demo.snippet "clicker-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "clicker-example-1.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "clicker-example-action.js" label="Action handing" language="javascript"}}
{{/docs-demo}}

### Clicker field with a custom component

You can use a custom component for the checkbox label by passing `displayComponent` to the field. The component passed will then be rendered in place of the standard clicker component.

The object passed must take the following form.

``` 
{ 
  path: // String, required. The path to the component to render', 
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

* The component will also have access to an `formField` prop, with the formField object.
* The component will also have access to the `classNames` property. These are the classnames that would be applied to the standard clicker element, derived by resolving th default class names for the field, with any overrides provided.
* The component will also have access to a `changesetProp` prop, which ios the changeset underlying the form.

Pass `displayComponent` as an object containing:

* `path` - the path to the component to render
* `props`

If using a `button` element in your custom clicker component, bear in mind that the default `type` of a button is `submit`. Thus, if you don't add a type to your button, clicking it will result in a form submission. Setting `type="button"` is recommended.

{{#docs-snippet name="custom-clicker-component.hbs"}}
<button type="button" onclick={{action onClick}} class={{classNames}}><b>{{formField.clickerText}}</b> {{component icon}}</button>
{{/docs-snippet}}

{{#docs-demo as |demo|}}
  {{#demo.example name="clicker-example-2.hbs"}}
    <div data-test-id="clicker-example-2">
      <ChangesetWebform 
        @formSchema={{clickerExample2FormSchema}} 
        @onUserInteraction={{action "onUserInteractionClicker1"}}/>
    </div> 
  {{/demo.example}}
  {{demo.snippet "clicker-example-2.js" label="Component JS" language="javascript"}}
  {{demo.snippet "clicker-example-2.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "clicker-example-action.js" label="Action handing" language="javascript"}}
  {{demo.snippet "custom-clicker-component.js" label="Custom clicker JS" language="javascript"}}
  {{demo.snippet "custom-clicker-component.hbs" label="Custom clicker HBS" language="htmlbars"}}
{{/docs-demo}}

<!-- <ChangesetWebform @formSchema={{this.testFormSchema}} /> -->

```
{
    fieldType: 'input',
    inputType: 'text',
    placeholder: 'Lot number',
    autofocus: true
  },
  { fieldType: 'radioButtonGroup', options: [] },
  {
    fieldType: 'powerSelect',
    placeholder: 'Select',
    searchEnabled: true,
    allowClear: false,
    options: [],
    optionDisplayProp: 'name',
    selectedItemComponent: 'hyrax-ember-assets/janus/forms/shared-fields/country-field-selected-item',
    optionComponent: 'hyrax-ember-assets/janus/forms/shared-fields/country-field-option'
  },
  { fieldType: 'clicker' },
  { fieldType: 'prevalenceCutoff', inputType: 'number' },
  {
    fieldType: 'powerDatePicker',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    defaultTime: '23:59:59',
    calendarContainerClasses: 'pop-up-box box-arrow',
    closeDatePickerOnSelect: true,
    dateRangeSettings: { rangePosition: 'end', rangePartnerFieldId: 'inserted_from' }
  },
  {
    fieldType: 'singleCheckbox',
    checkBoxLabel: 'Generate BAM files (Note that BAM files are large and may slow the job down)',
    label: 'I agree that my uploaded data can be used anonymously for research purposes other than surveillance. See our [privacy policy](https://exatype.com/privacy-policy) for further information.',
    checkBoxLabelMarkdown: 'I agree that my uploaded data can be used anonymously for research purposes other than surveillance. See our [privacy policy](https://exatype.com/privacy-policy) for further information.'
  },
  {
    fieldType: 'staticContent',
    text: 'andrew+no-org@hyraxbio.com',
    textElement: 'div',
    textElementClass: 'badge badge-gray-medium',
    contentComponent: {
      path: 'hyrax-ember-assets/exatype/surveillance-research-data-consent-revoked-notice',
      props: [Object]
    }
  },
  { fieldType: 'noDisplay' },
  { fieldType: 'checkboxGroup', 
  placeholder: 'Select', options: [] }

```