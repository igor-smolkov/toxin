import 'jquery-ui/ui/widgets/slider';
import './slider.scss';

$('.slider__root').each(function(){
    const values = this.dataset.values
        .substring(1, this.dataset.values.length-1)
        .split(',');
    const config = {
        min: +values[0],
        max: +values[values.length-1],
        values: [+values[1], +values[values.length-2]],
    }
    $(this).slider({
        range: true,
        min: config.min,
        max: config.max,
        values: config.values,
    });
});