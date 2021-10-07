import './*.scss';
import $ from 'jquery';

import '../../../components/**/*.scss';
import '../../../components/**/*.js';
import Calendar from '@comp/calendar/calendar';

((elem) => new Calendar(elem))($('.js-calendar-unit').find('.calendar'));
