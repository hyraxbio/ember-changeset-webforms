export default function generateFormValues(formFields) {
  var final = {};
  formFields.forEach(function(field) {
    function processField(levels, final, value) {
      var acc = final;
      levels.forEach(function(level, index) {
        if (index === levels.length-1) {
          if (field.includeLabelOnSubmit) {
            acc[level] = {
              label: field.fieldLabel,
              value: value
            };
          } else {
            acc[level] = value;
          }
        } else {
          acc[level] = acc[level] || {};
          acc = acc[level];
        }
      });
    }
    if (field.fieldType === 'staticContent' || field.hidden) {return;}
    if (field.fieldSubIds) {
      field.fieldSubIds.forEach(subId => {
        var levels = `${field.fieldId}${subId.id}`.split('.');
        processField(levels, final, field.value[subId.valueKey]);
      });
    } else {
      var levels = field.fieldId.split(".");
      processField(levels, final, field.value);
    }
  });
  return final;
}
