import $ from 'jquery';

import Toggle from './-toggle';

$('.js-toggle').each((_, elem) => new Toggle($(elem)));
