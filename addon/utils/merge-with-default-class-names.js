export default function(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    if (srcValue.indexOf('...defaults') > -1) {
      return objValue.concat(srcValue).filter(className => !className.startsWith('.'));
    } else {
      return srcValue.filter(className => !className.startsWith('.'));
    }
  }
}