import { visit, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import dummyEls from './test-selectors';

module('Acceptance | Radio button group', function (hooks) {
  setupApplicationTest(hooks);

  test('Basics', async function (assert) {
    await visit('/docs/built-in-fields');
    assert
      .dom(`${dummyEls.radioButtonGroupExample1} ${dummyEls.currentValue}`)
      .doesNotExist('Current value not shown on load.');
    await click(
      `${dummyEls.radioButtonGroupExampleFormRgbColoursFieldRadioOptionFf0000} input`,
    );
    assert
      .dom(`${dummyEls.radioButtonGroupExample1} ${dummyEls.currentValue}`)
      .hasText(
        'Selected colour: ff0000',
        'Current value shows correct text after radio is checked, confirming that field value is updated correctly.',
      );
    await click(
      `${dummyEls.radioButtonGroupExampleFormRgbColoursFieldRadioOption00ff00} input`,
    );
    assert
      .dom(`${dummyEls.radioButtonGroupExample1} ${dummyEls.currentValue}`)
      .hasText(
        'Selected colour: 00ff00',
        'Current value shows correct text after radio is checked, confirming that field value is updated correctly.',
      );
  });

  test('With component label', async function (assert) {
    await visit('/docs/built-in-fields');
    assert
      .dom(`${dummyEls.radioButtonGroupExample2FormRadioButtons2Field}`)
      .hasText(
        'Custom label components This is a custom component used for all the label of all the options option.label = Option 1 props.infoLink = https://example.com This is a custom component used for all the label of all the options option.label = Option 2 props.infoLink = https://example.com This is a custom component for the label of one specific option More info',
        'Both field.optionLabelComponent and option.labelComponent are loading correctly, and the option and props obejcts are passed in correctly to field.optionLabelComponent.',
      );
    await click(
      `${dummyEls.radioButtonGroupExample2} ${dummyEls.moreInfoToggler}`,
    );
    assert
      .dom(`${dummyEls.radioButtonGroupExample2FormRadioButtons2Field}`)
      .hasText(
        'Custom label components This is a custom component used for all the label of all the options option.label = Option 1 props.infoLink = https://example.com This is a custom component used for all the label of all the options option.label = Option 2 props.infoLink = https://example.com This is a custom component for the label of one specific option More info option.label = Option 3 option.value = 3 props.info = Some additional info',
        'The option and props obejcts are correctly passed in to option.labelConmponent.',
      );
  });
});
