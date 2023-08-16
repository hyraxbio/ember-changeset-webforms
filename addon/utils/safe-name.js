import { dasherize } from '@ember/string';

export default function safeName(str) {
  str = dasherize(str);
  str = str
    .replace(/\s/g, '-')
    .replace(/-+/g, '-')
    .replace(/[^0-9a-zA-Z_-]/g, '')
    .toLowerCase();
  return str;
}
