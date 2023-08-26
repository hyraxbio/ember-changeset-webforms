# Creating custom fields

Creating custom fields content

** Make sure it knows what to do if disabled.

Emit the userInteraction actions with eventType

id={{formField.id}}
ariaLabelledBy={{ariaLabelledBy}}
aria-label={{ariaLabel}}

# Custom tracked props

The underlying classes for `formSettings`, and `fields` (as well as cloned fields) have a tracked property `externalProps` which is an empty object.

{{#docs-demo as |demo|}}
  {{#demo.example name="external-props-form.hbs"}}
    <ChangesetWebform 
      @formSchema={{formSchema}} 
      @onUserInteraction={{action "updateExternalProps"}} 
     />
  {{/demo.example}}
  {{demo.snippet "external-props-form.js" label="Component JS" language="javascript"}}
  {{demo.snippet "external-props-form.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}