import $ from 'jquery';
import './like-button.scss';

function handleChange() {
  $(this).next().text($(this).prop('checked')
    ? +$(this).next().text() + 1
    : +$(this).next().text() - 1);
}

$('.js-like-button__box').on('change', handleChange);
