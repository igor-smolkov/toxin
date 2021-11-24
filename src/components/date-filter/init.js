import $ from 'jquery';

import DateFilter from './DateFilter';

$('.js-date-filter').each((_, elem) => new DateFilter($(elem)));
