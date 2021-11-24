import $ from 'jquery';

import Preview from './Preview';

$('.js-preview').each((_, elem) => new Preview($(elem)));
