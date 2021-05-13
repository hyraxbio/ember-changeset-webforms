# Basic usage

{{#docs-demo as |demo|}}
  {{#demo.example name="login-form.hbs"}}
    <ChangesetWebform 
      @formSchema={{formSchema}} 
      @data={{hash email="andrew.paterson@test.com"}}
      @submitAction={{action "submit"}} 
      @saveSuccess={{action "saveSuccess"}} 
     />
  {{/demo.example}}
  {{demo.snippet "login-form.hbs" label="Template" language="htmlbars"}}
  {{demo.snippet "login-form.js" label="Component JS" language="javascript"}}
{{/docs-demo}}
