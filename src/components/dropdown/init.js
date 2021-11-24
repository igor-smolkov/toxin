import $ from 'jquery';

import Dropdown from './-dropdown';

$('.js-dropdown').each((_, elem) => new Dropdown($(elem)));
