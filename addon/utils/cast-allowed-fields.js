const keys = Object;
const CHANGES$1 = '_changes';

export default function castAllowedFields(changesetWebform) {
  var allKeys = (changesetWebform.changeset.changes || [])
    .map((item) => {
      return item.key;
    })
    .concat(keys(changesetWebform.changeset.data));
  var allowedKeys = allKeys.filter((key) => {
    var relatedField =
      changesetWebform.fields.find((field) => {
        return field.propertyName === key;
      }) || {};
    return !(relatedField.hidden || relatedField.castOut);
  });
  return cast(changesetWebform.changeset, allowedKeys);
}

function cast(changeset, allowed = []) {
  let changes = changeset[CHANGES$1];
  if (Array.isArray(allowed) && allowed.length === 0) {
    return changeset;
  }
  let changeKeys = changeset.changes.map((item) => item.key);
  let validKeys = changeKeys.filter((key) => allowed.includes(key));
  let casted = take(changes, validKeys);
  // @tracked
  changeset[CHANGES$1] = casted;
  return changeset;
}

function take(originalObj = {}, keysToTake = []) {
  const filter = expandPaths(keysToTake);
  return filterObjectByPath(originalObj, filter);
}

function filterObjectByPath(object, filter) {
  const filteredObject = {};
  for (let key in object) {
    if (filter.hasOwnProperty(key)) {
      if (typeof object[key] === 'object' && typeof filter[key] === 'object' && Object.keys(filter[key]).length > 0) {
        filteredObject[key] = filterObjectByPath(object[key], filter[key]);
      } else {
        filteredObject[key] = object[key];
      }
    }
  }
  return filteredObject;
}

function expandPaths(paths) {
  const expandedObject = {};
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i].split('.');
    let current = expandedObject;
    for (let j = 0; j < path.length; j++) {
      const key = path[j];
      if (!current.hasOwnProperty(key)) {
        current[key] = {};
      }
      current = current[key];
    }
  }
  return expandedObject;
}
