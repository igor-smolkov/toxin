import $ from 'jquery';

import Preview from './-preview';

$('.js-preview').each((_, elem) => new Preview($(elem)));
