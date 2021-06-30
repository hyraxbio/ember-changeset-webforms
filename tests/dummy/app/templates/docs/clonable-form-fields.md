# Clonable form fields

Clonable form fields content

{{#docs-demo as |demo|}}
  {{#demo.example name="clone-group-form.hbs"}}
    <ChangesetWebform 
      @formSchema={{formSchema}} 
      @submitAction={{action "submit"}} 
      data-test-id="clonable-field-basics"
    />
  {{/demo.example}}
  {{demo.snippet "clone-group-form.js" label="Component JS" language="javascript"}}
  {{demo.snippet "clone-group-form.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}
## With preloaded data

{{#docs-demo as |demo|}}
  {{#demo.example name="clone-group-form-with-data.hbs"}}
    <ChangesetWebform 
      @formSchema={{formSchema}} 
      @data={{data}}
      @submitAction={{action "submit"}} 
      data-test-id="clonable-field-with-data"
    />
  {{/demo.example}}
  {{demo.snippet "clone-group-form-data.js" label="Data" language="javascript"}}
  {{demo.snippet "clone-group-form-with-data.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "clone-group-form.js" label="Component JS" language="javascript"}}
{{/docs-demo}}

Note that when the array of data passed to a `clone-group` field is longer than the `maxClones` setting, the component will still insert one clone for each item in the array. In this case, the add clonbe button will not be available until the user has removed clones until the total is less than the `maxClones` setting.