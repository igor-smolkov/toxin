import $ from 'jquery';

import myJQuerySliderFactory from '@plug/jquery.my-jquery-slider';

myJQuerySliderFactory($);

$('.js-slider__root').each(function initSlider() {
  const limits = this.dataset.values
    .substring(1, this.dataset.values.length - 1)
    .split(',')
    .map((v) => +v);
  $(this).myJQuerySlider({
    limits,
    step: 0.1,
    withIndent: false,
  });
});
