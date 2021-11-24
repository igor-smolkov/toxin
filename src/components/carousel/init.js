import $ from 'jquery';

import Carousel from './Carousel';

$('.js-carousel').each((_, elem) => new Carousel($(elem)));
