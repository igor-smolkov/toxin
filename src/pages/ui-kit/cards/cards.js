import $ from 'jquery';

import Calendar from '@comp/calendar/calendar';

import '../../../components/**/*.scss';
import '../../../components/**/*.js';
import './*.scss';

((elem) => new Calendar(elem))($('.js-calendar-unit').find('.calendar'));
