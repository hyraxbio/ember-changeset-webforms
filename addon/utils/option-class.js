import { tracked } from '@glimmer/tracking';

export default class Option {
  @tracked value;
  @tracked onlyCheckedOption;
  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }
}
