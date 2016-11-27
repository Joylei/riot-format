import Formatter, {
  extend
} from './formatter';
import format from './format';

//import built-in formatters
import './formats';

export default function hook(riot) {

  // if (!riot.Tag.prototype.format) {
  //   riot.Tag.prototype.format = format;
  // }

  riot.mixin({
    format
  });
};

hook.define = extend;

hook.format = format;

//hook.Formatter = Formatter;

export { extend as define } from './formatter';

export { default as format } from './format';