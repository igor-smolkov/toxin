import $ from 'jquery';

import NavLink from './NavLink';

$('.js-nav-link').each((_, elem) => new NavLink($(elem)));
