# Clonable form fields

Clonable form fields content

{{#docs-demo as |demo|}}
  {{#demo.example name="clone-form.hbs"}}
    <ChangesetWebform 
      @formSchema={{formSchema}} 
      @submitAction={{action "submit"}} 
      data-test-id="clonable-field-basics"
    />
  {{/demo.example}}
  {{demo.snippet "clone-form.js" label="Component JS" language="javascript"}}
  {{demo.snippet "clone-form.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}

## With preloaded data

{{#docs-demo as |demo|}}
  {{#demo.example name="clone-form-with-data.hbs"}}
    <ChangesetWebform 
      @formSchema={{formSchema}} 
      @data={{hash emails=(array "test1@timosol.com" "test1@timosol.com" "test3@timosol.com" "test4@timosol.com" "test5@timosil.com")}}
      @submitAction={{action "submit"}} 
      data-test-id="clonable-field-with-data"
    />
  {{/demo.example}}
  {{demo.snippet "clone-form-with-data.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "clone-form.js" label="Component JS" language="javascript"}}
{{/docs-demo}}
