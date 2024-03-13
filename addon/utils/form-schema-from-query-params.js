import moment from 'moment';
export default function formSchemaFromQueryParams(
  queryParamsObjects,
  formName,
) {
  var formSchema = {
    formSettings: {
      formName: formName,
      submitButtonText: 'Apply Filters',
      clearFormButtonText: 'Reset filters',
      showClearFormButton: true,
      clearFormAfterSubmit: false,
      submitAfterClear: true,
    },
    generalClassNames: {
      clearFormButton: ['btn', 'btn-outline-gray-medium'],
      submitButton: ['btn', 'btn-primary', 'cwf-form-submit-button'],
    },
    fields: [],
  };

  var dateRangeFieldLabels = [];
  queryParamsObjects.forEach((item) => {
    if (!item.filtersForm) {
      return;
    }
    if (item.filtersForm.fieldType === 'dateRange') {
      dateRangeFieldLabels.push(item.filtersForm.fieldLabel);
      return;
    }
    var field = {
      fieldId: item.key,
      defaultValue: item.defaultValue,
    };
    for (var key in item.filtersForm) {
      field[key] = item.filtersForm[key];
    }
    formSchema.fields.push(field);
  });
  dateRangeFieldLabels.uniq().forEach((label) => {
    var objects = queryParamsObject.items.filter((item) => {
      if (!item.filtersForm) {
        return;
      }
      return item.filtersForm.fieldLabel === label;
    });
    var field = {
      fieldLabel: label,
      fieldType: 'dateRange',
      fieldSubIds: [
        {
          id: '_from',
          valueKey: 'start',
        },
        {
          id: '_to',
          valueKey: 'end',
        },
      ],
      maxDate: moment().toDate(),
      startTime: '00:01',
      endTime: '23:59',
    };
    var start = objects.find((object) => {
      return object.key.endsWith('_from');
    });
    var end = objects.find((object) => {
      return object.key.endsWith('_to');
    });
    var startSharedKey = start.key.slice(0, start.key.lastIndexOf('_from'));
    var endSharedKey = end.key.slice(0, end.key.lastIndexOf('_to'));

    if (startSharedKey === endSharedKey) {
      field.fieldId = startSharedKey;
    } else {
      throw `Your queryParams definition for ${queryParamsObject.name} has two fields set to form field type dateRange, and both have the fieldLabel ${label}. However, their keys do not correspond. They respective keys must start with the same string, followed by '_from' for the start date, and followed by '_to' for the end date.`;
    }

    field.defaultValue = {
      start: start.defaultValue,
      end: end.defaultValue,
    };
    formSchema.fields.push(field);
  });
  return formSchema;
}
