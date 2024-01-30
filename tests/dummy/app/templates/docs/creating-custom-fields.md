# Creating custom fields

Creating custom fields content

** Make sure it knows what to do if disabled.

Emit the userInteraction actions with eventType

id={{this.formField.id}}
ariaLabelledBy={{this.ariaLabelledBy}}
aria-label={{this.ariaLabel}}

# Custom tracked props

The underlying classes for `formSettings`, and `fields` (as well as cloned fields) have a tracked property `externalProps` which is an empty object.

<DocsDemo as |demo|>
  <demo.example @name="external-props-form.hbs">
    <ChangesetWebform 
      @formSchema={{this.formSchema}} 
      @onUserInteraction={{action "updateExternalProps"}} 
     />
  </demo.example>
  <demo.snippet @name="external-props-form.js" @label="component js" @language="javascript" />
  <demo.snippet @name="external-props-form.hbs" @label="template" @language="htmlbars" />
</DocsDemo>