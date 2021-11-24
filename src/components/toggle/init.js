import $ from 'jquery';

import Toggle from './Toggle';

$('.js-toggle').each((_, elem) => new Toggle($(elem)));
