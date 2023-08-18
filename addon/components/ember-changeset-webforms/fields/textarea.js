import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Input from './input';
import layout from '../../../templates/components/ember-changeset-webforms/fields/textarea';

@templateLayout(layout)
@tagName('')
export default class Textarea extends Input {}
