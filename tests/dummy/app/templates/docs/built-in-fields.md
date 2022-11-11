

The value of a field will set the property in the underlying changeset at the path defined as `propertyName` or `fieldId`.

## Input

Renders an HTML input. 

Calls the `keyUp`, `focusIn` and `focusOut` actions when the corresponding events occur.

{{docs-snippet name="input-field-options.js"}}

{{#docs-demo as |demo|}}
  {{#demo.example name="input-example-1.hbs"}}
    <ChangesetWebform @formSchema={{inputExample1FormSchema}} />
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

{{docs-snippet name="textarea-field-options.js"}}

{{#docs-demo as |demo|}}
  {{#demo.example name="textarea-example-1.hbs"}}
    <ChangesetWebform @formSchema={{textareaExample1FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "textarea-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "textarea-example-1.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

## Power select

Renders an [ember-power-select](https://ember-power-select.com) component.

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

## Power datepicker

{{docs-snippet name="powerDatePicker-field-options.js"}}


<!-- {{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-1.hbs"}}
    <ChangesetWebform @formSchema={{powerDatapickerExample1FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-1.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-1.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-2.hbs"}}
    <ChangesetWebform @formSchema={{powerDatapickerExample2FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-2.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-2.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}} -->

### With time selector using 24 hour format

TODO SSSSS must go down tpo SSS

2022-11-03 14:42:19

{{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-3.hbs"}}
    <div data-test-id="power-datepicker-24-hour-time-select">
      <b>Raw date time:</b>
      <span class="raw-date-time" data-test-id="raw-date-time">{{rawDateTime3}}</span>
    <ChangesetWebform 
      @formSchema={{powerDatapickerExample3FormSchema}}
      @afterFieldEdit={{action "updateRawDateTime" "3"}}
    />
    </div> 
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-3.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-3.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

### With time selector using 12 hour format

{{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-4.hbs"}}
    <div data-test-id="power-datepicker-12-hour-time-select">
      <b>Raw date time:</b>
      <span class="raw-date-time" data-test-id="raw-date-time">{{rawDateTime4}}</span>
      <ChangesetWebform 
        @formSchema={{powerDatapickerExample4FormSchema}}
        @afterFieldEdit={{action "updateRawDateTime" "4"}}
      />
    </div>
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-4.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-4.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name="power-datepicker-example-5.hbs"}}
    <div data-test-id="power-datepicker-unusual-format" >
      <b>Raw date time:</b>
      <span class="raw-date-time" data-test-id="raw-date-time">{{rawDateTime5}}</span>
      <span class="output-field-value" data-test-id="output-field-value">{{outputFieldValue5}}</span>
      <ChangesetWebform 
        @formSchema={{powerDatapickerExample5FormSchema}}
        @afterFieldEdit={{action "updateRawDateTime" "5"}}
      />
    </div> 
  {{/demo.example}}
  {{demo.snippet "power-datepicker-example-5.js" label="Component JS" language="javascript"}}
  {{demo.snippet "power-datepicker-example-5.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

## Single checkbox

{{docs-snippet name="singleCheckbox-field-options.js"}}

## Radio button group

Renders a radio button group. The value of the field as a whole is the `value` property of the currently selected option.

{{docs-snippet name="radioButtonGroup-field-options.js"}}

### Radio button group options

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
* The component will also have access to the `radioId` property. Set the label elements `for` attribute to this value to match it to the related checkbox.

{{#docs-demo as |demo|}}
  {{#demo.example name="checkbox-group-example-2.hbs"}}
    <ChangesetWebform @formSchema={{checkboxGroupExample2FormSchema}} />
  {{/demo.example}}
  {{demo.snippet "checkbox-group-example-2.js" label="Component JS" language="javascript"}}
  {{demo.snippet "checkbox-group-example-2.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}



{{docs-snippet name="dateRange-field-options.js"}}

{{docs-snippet name="tagSelector-field-options.js"}}

{{docs-snippet name="clicker-field-options.js"}}

{{docs-snippet name="staticContent-field-options.js"}}

{{docs-snippet name="clone-group-field-options.js"}}


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