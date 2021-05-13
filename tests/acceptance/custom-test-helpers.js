export default {
  textContentArray(elements) {
    return (elements || []).map(element => {
      return element.textContent.trim();
    });
  },
}