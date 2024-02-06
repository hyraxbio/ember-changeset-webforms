# Integrating custom validators

The [Ember Changeset Validations docs on writing your own validators](https://github.com/poteto/ember-changeset-validations#writing-your-own-validators) outlines how to write your own synchronous or asynchronous validators.

The method for creating custom validators in **Ember Changeset Webforms** is identical, but in order to use them, you must pass your custom validators to the `ChangesetWebform` component as the `@customValidators` property.

The format of the `@customValidators` property should be a javascript object with a named method for each custom validator that you would like to use in the component.

## Example

The example below shows how to:

1. Define a custom validator named `uniqueness.js` in the `validators` directory of your app.
2. Create a file which exports all of your validators at `validators/index.js`.
3. Import your validators into a controller as `customValidators`, and declare them as a controller property, so that they can be used in the corresponding template. Use the `validateUniqueness` custom validator when defining form fields.
4. Pass the `@customValidators` property to the 

<Demos::CustomValidatorsForm />

## Additional notes

You can save your validators anywhere, provided that your import statement knows where they are.

You don't have to import all of your custom validators in any component or controller. Importing only those you want to use in that controller or component is fine.

When defining your custom validator, the single argument to the main function will receive everything in the `arguments` object passed to `validationMethod` when defining the field.

In the examples above, the field definitions have an object called `descriptionsMap` passed to the `arguments` property.

```
validationRules: [{
  validationMethod: 'validateUniqueness',
  arguments: {
    descriptionsMap: {
      primaryEmail: 'primary email',
      recoveryEmail: 'recovery email' 
    }
  }
}],
```
The corresponding validator function can then access the `directionsMap` object via `opts.descriptionsMap`.

```
export default function validateUniqueness(opts) {
  console.log(opts.descriptionsMap)
  ...
```