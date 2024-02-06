# Form submission

When a user clicks the submit button, the `submit` action is fired the `ChangesetWebform` component.

The following series of events occurs.

* All fields with validation rules are validated, unless the `skipValidate` or `hidden` properties on the field are true.
* If an action was passed to the `ChangesetWebform` component as the `afterValidateFields` prop, that action is triggered with `(changesetWebform, validationResult)` as arguments.

## If validation fails

* If validation fails, nothing further happens.

## If validation passes

* If an action was passed to the `ChangesetWebform` component as the `beforeSubmission` prop, that action is triggered with `(changesetWebform)` as the only argument.

Then the internal `castAllowedFields` action is triggered. This action runs the `cast` method on the changeset ([See these docs](https://github.com/poteto/ember-changeset#cast)). Any fields which have either `hidden` or `castOut` set to true will not be included in the array of changeset properties passed to the `cast` method, and thus will not be included data which is submitted.

* The property `ChangesetWebform.formSettings.requestInFlight` is then set to `true`.

* The `save` method is run on the changeset, and returns a promise. ([See these docs](https://github.com/poteto/ember-changeset#save)).

## If the `changeset.save()` promise rejects

* If an action was passed to the `ChangesetWebform` component as the `submitError` prop, that action is triggered with `(error, changesetWebform)` as the arguments.

## If the `changeset.save()` promise resolves

### If the `submitAction` prop is not passed

* If an action was passed to the `ChangesetWebform` component as the `submitSuccess` prop, that action is triggered with `(submitActionResponse, changesetWebform)` as the arguments, where `submitActionResponse` is what is returned by  `submitAction`.

* The property `ChangesetWebform.formSettings.requestInFlight` is then set to `false`.

* If the `changesetWebform.formSettings.clearFormAfterSubmit` prop is `true`, the form will be cleared, but and any fields with a `defaultValue` prop will be set to that value.

* If an action was passed to the `ChangesetWebform` component as the `submitAction` prop, that action is triggered with `(savedChangeset.data, changesetWebform)` as the only argument, where `savedChangeset` is the result of the resolved `changeset.save()` promise.

  * `submitAction` can be a promise or a synchronous function. 

### If `submitAction` succeeds

* If an action was passed to the `ChangesetWebform` component as the `submitSuccess` prop, that action is triggered with `(submitActionResponse, changesetWebform)` as the arguments, where `submitActionResponse` is what is returned by  `submitAction`.

* The property `ChangesetWebform.formSettings.requestInFlight` is then set to `false`.

* If the `changesetWebform.formSettings.clearFormAfterSubmit` prop is `true`, the form will be cleared, but and any fields with a `defaultValue` prop will be set to that value.

### If `submitAction` fails

* The property `ChangesetWebform.formSettings.requestInFlight` is then set to `false`.

* If an action was passed to the `ChangesetWebform` component as the `submitError` prop, that action is triggered with `(error, changesetWebform)` as the arguments.



<DocsDemo as |demo|>
  <demo.example @name="clear-form-form-schema.hbs">
    <ChangesetWebform @formSchema={{this.clearFormSchema}} @submitAction={{this.doSubmit}} />
  </demo.example>
  <demo.snippet @name="clear-form-form-schema.js" @label="component js" @language="javascript" />
  <demo.snippet @name="clear-form-form-schema.hbs" @label="template" @language="htmlbars" />
</DocsDemo>