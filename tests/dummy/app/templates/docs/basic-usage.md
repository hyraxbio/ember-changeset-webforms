# Basic usage

<DocsDemo as |demo|>
  <demo.example @name="login-form.hbs">
  <ChangesetWebform 
    @formSchema={{this.formSchema}} 
    @data={{hash email="andrew.paterson@test.com"}}
    @submitAction={{action "submit"}} 
    @submitSuccess={{action "submitSuccess"}} 
    />
    </demo.example>
  <demo.snippet @name="login-form.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="login-form.js" @label="Component JS" @language="javascript" />
</DocsDemo>

## Form settings

Every `formSchema` has a set of options which relate to the form as a whole.

The snippet below shows the available options, with the default value and an explanation.

Note that these options can be overridden for an entire consuming app in `ENV.changesetWebformsDefaults.formSettings` in  `config/environment.js`.

<DocsSnippet @name="form-settings-options.js" />

They can also be overridden for any individual form schema in the `settings` object. 

<DocsDemo as |demo|>
  <demo.example @name="login-form-2.hbs">
    <ChangesetWebform 
      @formSchema={{this.formSchema}} 
      @data={{hash email="andrew.paterson@test.com"}}
      @submitAction={{action "submit"}} 
      @submitSuccess={{action "submitSuccess"}} 
     />
  </demo.example>
  <demo.snippet @name="login-form.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="login-form.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>