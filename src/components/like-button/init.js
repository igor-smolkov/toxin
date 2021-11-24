import $ from 'jquery';

import LikeButton from './LikeButton';

$('.js-like-button').each((_, elem) => new LikeButton($(elem)));
