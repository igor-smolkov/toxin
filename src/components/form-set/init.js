import $ from 'jquery';

import FormSet from './FormSet';

$('.js-form-set').each((_, elem) => new FormSet($(elem)));
