export default function objectFromPath(obj, path, value = null) {
  path = typeof path === 'string' ? path.split('.') : path;
  let current = obj;
  while (path.length > 1) {
    const [head, ...tail] = path;
    path = tail;
    if (current[head] === undefined) {
      current[head] = {};
    }
    current = current[head];
  }
  current[path[0]] = value;
  return obj;
}