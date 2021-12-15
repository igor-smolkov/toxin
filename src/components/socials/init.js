import $ from 'jquery';

import Socials from './Socials';

$('.js-socials').each((_, elem) => new Socials($(elem)));
