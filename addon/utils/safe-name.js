import { dasherize } from '@ember/string';

export default function safeName(str) {
  if (!str) {
    return;
  }
  str = dasherize(str);
  str = str
    .replace(/\s/g, '-')
    .replace(/-+/g, '-')
    .replace(/[^0-9a-zA-Z_-]/g, '')
    .replace(/\./g, '_')
    .toLowerCase();
  return str;
}
