export default function(objValue, srcValue, key) {
  if (Array.isArray(objValue) && key.endsWith('ClassNames') ) {
    if (srcValue.indexOf('...defaults') > -1) {
      return objValue.concat(srcValue).filter(className => !className.startsWith('.'));
    } else {
      return srcValue.filter(className => !className.startsWith('.'));
    }
  }
}

