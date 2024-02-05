import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/formatted-datetimes';

@templateLayout(layout)
export default class FormattedDatetimes extends Component {}
