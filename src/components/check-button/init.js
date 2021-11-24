import $ from 'jquery';

import CheckButton from './CheckButton';

$('.js-check-button').each((_, elem) => new CheckButton($(elem)));
