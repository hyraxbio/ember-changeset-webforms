import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
// import registerPowerCalendarHelpers from 'ember-power-calendar/test-support/helpers/ember-power-calendar';
                                                             
// registerPowerCalendarHelpers();

setApplication(Application.create(config.APP));

start();
