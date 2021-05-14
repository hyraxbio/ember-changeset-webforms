# Clonable form fields

Clonable form fields content

{{#docs-demo as |demo|}}
  {{#demo.example name="clone-form.hbs"}}
    <ChangesetWebform 
      @formSchema={{formSchema}} 
      @submitAction={{action "submit"}} 
     />
  {{/demo.example}}
  {{demo.snippet "clone-form.js" label="Component JS" language="javascript"}}
  {{demo.snippet "clone-form.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}
