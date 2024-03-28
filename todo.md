[ ] Docs for custom fields
[ ] default styles for remove clone button
[ ] Docs for power date picker must show defaultDate outside the input on load.

## Power selct

All actions emitted as userInteraction and onChnage
All options integrated

[x] containerName for checkbox group and radio button group

Do labelComponent, checkboxLabelComponent, optionLabelComponent, contentComponent allow strings?

All IDs must use formName as namespace

Tech debt

All classes and data attrs with ember-changeset-webforms replaced by cwf

change defaultValue to autoFill

Aria:
checked
controls
current
expanded
label
owns
selected

activedescendant
atomic
autocomplete
controls
current
describedby
disabled
expanded
hidden
label
labelledby
live
pressed
valuemax
valuemin
valuenow
valuetext

Use aria-labelledBy if label is present, else use label
role=group
aria described by for error messages

icons for next/prev month and year.
define app wide icons for cross etc.
Use svg for "ember-power-select-status-icon" (Override component)

TODO - exclude fields from changeset altogether, bot just castOut on submit. Set this is form when using field, or on field definition as a default.
TODO - disable single option where things have options.

TODO Document and test for <EmberChangesetWebforms::FieldElements::FieldDescription
@description={{@formField.description}}
@descriptionMarkdown={{@formField.descriptionMarkdown}}
/>

Chnagelog

default field names
No longer force save even when submit action is provided

Check if ember try
