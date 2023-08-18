import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/field-description';

@tagName('')
@templateLayout(layout)
export default class FieldDescription extends Component {}
