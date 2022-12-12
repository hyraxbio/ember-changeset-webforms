import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
    const ENV = {
      changesetWebformsDefaults: {}
    }

    // BEGIN-SNIPPET class-name-config-inherit-defaults.js
    // Addon default class names for labelElement === ['form-label']
    // config/environment.js
    ENV.changesetWebformsDefaults.generalClassNames = {
      labelElement: ['...defaults', 'label-el'], // class="form-label label-el"
    }
    // END-SNIPPET
    // BEGIN-SNIPPET class-name-config-ignore-defaults.js
    // Addon default class names for labelElement === ['form-label']
    // config/environment.js
    ENV.changesetWebformsDefaults.generalClassNames = {
      labelElement: ['label-el'], // class="label-el"
    }
    // END-SNIPPET
    // BEGIN-SNIPPET class-name-config-validation-classes.js
    // config/environment.js
    ENV.changesetWebformsDefaults.generalClassNames = {
      // Field label class="is-valid" when field passed validation
      // Field label class="is-invalid" when field failed validation
      // Field label class="" when field is not yet validated
      fieldLabel: ['...validationClassNames'], 
    }
    // END-SNIPPET

  }
});