import CloneGroupFormComponent from './clone-group-form';
export default class CloneGroupFormWithFormWithDataComponent extends CloneGroupFormComponent {
  // BEGIN-SNIPPET clone-group-form-data.js
  data = {
    emails: [
      'tobias@timosol.com',
      'tobias@timosol.com',
      null,
      'lindsay@timosol.com',
      'maeby@timosol.com',
      'funke@timosil.com',
    ],
  };
  // END-SNIPPET
}
