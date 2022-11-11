export default {
  qunitModuleHooks(hooks) {
    QUnit.done(() => {
      this.failedTestIds = this.failedTestIds || [];
      if (this.failedTestIds.length) {
        const newParams = this.failedTestIds.map(id => `&testId=${id}`).join('');
        const currentUrl = document.location.href.split('?');
        const currentParamsArray = currentUrl[1].split('&') || [];
        const currentParamsNoTestIds = currentParamsArray.filter(item => item.indexOf('testId') < 0 && item.indexOf('moduleId') < 0).join('&');
        const newTestUrl = `${currentUrl[0]}?${currentParamsNoTestIds}${newParams}`.replace(/#.*?&/, '&').replace(/#.*?\?/, '?');

        console.log(`---------------------\nRerun ${this.failedTestIds.length} failed ${this.failedTestIds.length !== 1 ? 'tests': 'test'} ${newTestUrl}\n---------------------\n(Excludes tests marked as [MANUAL CHECK]).`);
        this.failedTestIds = [];
      }
    });

    hooks.afterEach((assert) => {
      this.failedTestIds = this.failedTestIds || [];
      if (assert.test.testReport.assertions.find(assertion => assertion.stack) && !assert.test.testReport.name.startsWith('[MANUAL CHECK]')) {
        this.failedTestIds.push(assert.test.testId);
      }
    }); 
  },

  getFailedTestIds(assert, failedTestIds) {
    if (assert.test.testReport.assertions.find(assertion => assertion.stack)) {
      failedTestIds.push(assert.test.testId);
    }
  },
}