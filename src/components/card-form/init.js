import $ from 'jquery';

import CardForm from './CardForm';

$('.js-card-form').each((_, elem) => new CardForm($(elem)));
