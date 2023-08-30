# Clonable form fields

A clonable form field allows the user to add and remove instances of a field. The example below allows a user to add multiple emails. When the form is submitted, the value of the clonable form field will be an array of values.

To make a field clonable, the `fieldType` property must be set to `clone-group`, and a `cloneFieldSchema` property must be included as well.

A clone group field can also have `minClones` and `maxClones` properties- integers specifying the minimum and maximum number of clones allowed.

Apart from the above properties, a clone group can have all the same settings and validations as any other field (Of course, validation rules aimed ayt single fields will not be relevant in this case).

The `cloneFieldSchema` property behaves exactly as the field Schema on any other field. It is self contained and can have any of the settings, validation rules, and validation events that any other field can have.

The following default field settings can also be overridden:

<InterpolatedSimpleJsSnippet @object={{this.cloneGroupFieldAddonDefaults}} @excludeKeys={{array "fieldType" "componentPath" "cloneFieldSchema"}} /> 

## Tracked clone settings

The following field settings are tracked, and so updating them for a clone in an action will result in a template update. 

{{docs-snippet name="cloned-field-settings-tracked-props.js" title="Tracked settings for a field clone"}}

## Example 1

The example below allows the user to add email addresses, with a minimum of 2 and a maximum of 4.

<DocsDemo as |demo|>
  <demo.example @name="clone-group-form.hbs">
    <ChangesetWebform 
      @formSchema={{this.formSchema}} 
      @submitAction={{action "submit"}} 
      data-test-id="clonable-field-basics"
    />
  </demo.example>
  <demo.snippet @name="clone-group-form.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="clone-group-form.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>
## Example 2 - with preloaded data

The data object passed to the `ChangesetWebform` component may pass an array of values for a clonable field, as below.

Note that null values are permitted. 

Note also that if the array is longer than the `maxClones` setting, the clonable field will still show one clone for each item in the array, and this will not automatically fail validation. 

In order to validate on the length of the array, add the `validateLength` validation rule to the `clone-group` field as shown in the component JS in the example below. Note that the validation for the clone group displays below the field label. Clicking submit below will result in the length validation error showing under the main field label.

<DocsDemo as |demo|>
  <demo.example @name="clone-group-form-with-data.hbs">
    <ChangesetWebform 
      @formSchema={{this.formSchema}} 
      @data={{this.data}}
      @submitAction={{action "submit"}} 
      data-test-id="clonable-field-with-data"
    />
  </demo.example>
  <demo.snippet @name="clone-group-form-data.js" @label="Data" @language="javascript" />
  <demo.snippet @name="clone-group-form-with-data.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="clone-group-form.js" @label="Component JS" @language="javascript" />
</DocsDemo>

Note that when the array of data passed to a `clone-group` field is longer than the `maxClones` setting, the component will still insert one clone for each item in the array. In this case, the add clone button will not be available until the user has removed clones until the total is less than the `maxClones` setting.


## Example 3 - misc TODO not required in docs 

<DocsDemo as |demo|>
  <demo.example @name="clone-group-form-with-keyup.hbs">
    <ChangesetWebform 
      @formSchema={{this.formSchema2}} 
      @submitAction={{action "submit"}} 
      data-test-id="clonable-field-countries"
    />
  </demo.example>
  <demo.snippet @name="clone-group-form-with-keyup.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="clone-group-form-keyup.js" @label="Data" @language="javascript" />
</DocsDemo>


## Validation notes

Note that there is an additional built in validator specifically for use in a clonedFieldSchema- `uniqueClone`. See usage in the above example. This validation rule checks that each clone is unique.

<!-- TODO move to more appropriate docs. -->
See [https://github.com/poteto/ember-changeset-validations#overriding-validation-messages](https://github.com/poteto/ember-changeset-validations#overriding-validation-messages) on how to override validation messages, while retaining dynamic values.