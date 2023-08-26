import { tracked } from '@glimmer/tracking';

export default class Option {
  @tracked value;
  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }
}
