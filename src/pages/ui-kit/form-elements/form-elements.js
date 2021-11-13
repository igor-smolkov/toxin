import $ from 'jquery';

import DateSection from '@comp/date-section/date-section';

import '../../../layouts/ui-kit/*.scss';
import '../../../components/**/*.scss';
import '../../../components/**/*.js';
import './**/*.scss';

((elem) => new DateSection(elem))($('.js-date-section'));
