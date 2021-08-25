import './cards.scss';
import $ from 'jquery';

import '../../../components/logo/logo';
import '../../../components/card/card';
import '../../../components/card-title/card-title';
import '../../../components/card-form/card-form';
import '../../../components/room/room';
import Calendar from '../../../components/calendar/calendar';

((elem) => new Calendar(elem))($('.js-calendar-unit').find('.calendar'));
