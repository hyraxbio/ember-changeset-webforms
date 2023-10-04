import { tracked } from '@glimmer/tracking';

export default class FormSettings {
  // BEGIN-SNIPPET form-settings-tracked-props.js
  @tracked hideSubmitButton;
  @tracked submitButtonText;
  @tracked submitButtonIcon;
  @tracked showClearFormButton;
  @tracked clearFormButtonText;
  @tracked showRollbackChangesetButton;
  @tracked showRollbackChangesetButtonText;
  @tracked requestInFlight;
  // END-SNIPPET
  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }
}
