# Field options

Field options content
label
labelComponent
validationRules
validationEvents
fieldId
hidden
fieldType
  inputType
defaultValue - only applied if form is submitted.
autoFocus: true,
hideLabel: true,
trim: false ?


## `fieldClassNames`

CSS classes to apply to the outer container of the form field.

## `cloneFieldSchema`



## `dataTestFieldName`

String / Optional. Will be adde to the field as the `data-test-name` attribute. Will be automatically generated based on the fieldId, if **TODO config.enableTestSelectors is true**
## `defaultValue` **TODO chnage to valueOnInsert

Optional. A value to automatically fill the field with when it is inserted into the DOM. Note that the changeset will only be updated accordingly if the field is inserted into the dom at some point. If the chnageset needs to have a property set whether or not the specific form element is every rendered on screen, you should add the property to the data object which you pass to the `ChangesetWebform` component.

## `disabled`

If true, the field will be disabled. Not that if you create custom fields you should ensur ethat the elements therein become disabled when `disabled` is true.

## `displayComponent`

** TODO where is this used.
## `fieldId`

String / Required. The ID of the field, which must be unique from all other fields in the same form schema. Note that `fieldId` will be the fallback for `propertyName` if it is not passed, see below. 

## `propertyName`

String / Optional - defaults to `fieldId` if not passed. The `propertyName` is the path within the changeset that this field will update. For example if a field has a `propertyName` of `details.country`, then when that field is changed the chnageset will be updated as below.

```
{
  details: {
    country: '***'
  }
}
```

## `fieldLabel`

Required / string. The display label of the field as a whole. 

## `fieldType`


## `hidden`


## `hideLabel`


## `hideSuccessValidation`


## `labelComponent`


## `name`




## `showfieldLabel`


## `templateSettings`


## `validationEvents`


## `validationRules`

## `trim`


