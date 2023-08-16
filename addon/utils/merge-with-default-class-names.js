export default function (objValue, srcValue) {
  if (Array.isArray(objValue)) {
    if (srcValue.indexOf('$inherited') > -1) {
      return objValue
        .concat(srcValue)
        .filter((className) => !className.startsWith('.'));
    } else {
      return srcValue.filter((className) => !className.startsWith('.'));
    }
  }
}
