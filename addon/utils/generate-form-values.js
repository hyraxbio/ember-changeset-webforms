export default function generateFormValues(formFields) {
  var values = {};
    formFields.forEach(function(field) {
      if (!field.fieldId) {return;}
      var levels = field.fieldId.split(".");
      var acc = values;
      levels.forEach(function(level, index) {
        if (index === levels.length-1) {
          acc[level] = field.value;
        } else {
          acc[level] = acc[level] || {};
          acc = acc[level];
        }
      });
    });
    return values;
}
