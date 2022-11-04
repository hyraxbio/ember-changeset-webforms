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

## Form settings

Every `formSchema` has a set of options which relate to the form as a whole.

The snippet below shows the available options, with the default value and an explanation.

Note that these options can be overridden for an entire consuming app in `ENV.changesetWebformsDefaults.formSettings` in  `config/environment.js`.

{{docs-snippet name="form-settings-options.js"}}

They can also be overridden for any individual form schema in the `settings` object. 

{{#docs-demo as |demo|}}
  {{#demo.example name="login-form-2.hbs"}}
    <ChangesetWebform 
      @formSchema={{formSchema}} 
      @data={{hash email="andrew.paterson@test.com"}}
      @submitAction={{action "submit"}} 
      @saveSuccess={{action "saveSuccess"}} 
     />
  {{/demo.example}}
  {{demo.snippet "login-form.js" label="Component JS" language="javascript"}}
  {{demo.snippet "login-form.hbs" label="Template" language="htmlbars"}}
{{/docs-demo}}