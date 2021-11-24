import $ from 'jquery';

import Carousel from './-carousel';

$('.js-carousel').each((_, elem) => new Carousel($(elem)));
