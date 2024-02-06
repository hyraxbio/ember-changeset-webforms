# Basic usage

<Demos::LoginForm />

## Form settings

Every `formSchema` has a set of options which relate to the form as a whole.

The snippet below shows the available options, with the default value and an explanation.

Note that these options can be overridden for an entire consuming app in `ENV.changesetWebformsDefaults.formSettings` in  `config/environment.js`.

<DocsSnippet @name="form-settings-options.js" />

They can also be overridden for any individual form schema in the `settings` object. 

<Demos::LoginFormTwo />