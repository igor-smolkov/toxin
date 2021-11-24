import $ from 'jquery';

import RadioGroup from './RadioGroup';

$('.js-radio-group').each((_, elem) => new RadioGroup($(elem)));
