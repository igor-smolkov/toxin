import $ from 'jquery';

import Dropdown from './Dropdown';

$('.js-dropdown').each((_, elem) => new Dropdown($(elem)));
