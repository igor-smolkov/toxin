import './carousel.scss'

class Carousel {
  constructor($elem) {
    this._$elem = $elem;
    this._id = this._$elem.attr('id');
    this._$currentSlide = $(`#${this._id}-current`);
    this._$nextSlide = $(`#${this._id}-next`);
    this._slideLinks = Array.from(this._$elem.find('.carousel-slide-src')).map(elem => elem.value);
    this._delay = this._$elem.data().delay * 1000;
    this._$currentSlide.css('backgroundImage', `url('${this._slideLinks[0]}'`);
    this._$nextSlide.css('backgroundImage', `url('${this._slideLinks[0]}'`);
    setTimeout(()=>this.play(1), this._delay);
  }
  play(n) {
    if (n >= this._slideLinks.length) { n = 0 }
    this._$nextSlide.css('backgroundImage', `url('${this._slideLinks[n]}'`);
    this._$nextSlide.addClass('slide-next-animate');
    this._$currentSlide.addClass('slide-current-animate');
    this._$nextSlide.on('animationend', () => {
      this._$currentSlide.css('backgroundImage', `url('${this._slideLinks[n]}'`);
      this._$nextSlide.removeClass('slide-next-animate');
      this._$currentSlide.removeClass('slide-current-animate');
      setTimeout(() => this.play(n + 1), this._delay);
    })
  }
}

$('.carousel').each((_, elem) => new Carousel($(elem)));

export default function(delay = 10000) {
    const carousels = document.querySelectorAll('.carousel')
    carousels.forEach(carousel => {
        let counterPrev = 0;
        let counterNext = 0;
        let first = 0;
        let last = 0;
        if (carousel.classList.contains('carousel_landing')) {
            counterPrev = 2;
            counterNext = 3;
            first = 1;
            last = 3;
        }
        if (carousel.classList.contains('carousel_log')) {
            counterPrev = 4;
            counterNext = 5;
            first = 4;
            last = 5;
        }
        setInterval(() => {
            carousel.querySelector('.carousel__prev').classList.remove('carousel__pic_'+counterPrev);

            counterPrev = counterNext;
            counterNext = counterNext >= last ? first : counterNext + 1;
            
            carousel.querySelector('.carousel__prev').classList.add('carousel__pic_'+counterNext);

            carousel.firstChild.style.webkitAnimation = 'none';
            carousel.lastChild.style.webkitAnimation = 'none';
            setTimeout(function() { 
                carousel.firstChild.style.webkitAnimation = '';
                carousel.lastChild.style.webkitAnimation = '';

                carousel.firstChild.classList.toggle('carousel__next');
                carousel.firstChild.classList.toggle('carousel__prev');

                carousel.lastChild.classList.toggle('carousel__prev');
                carousel.lastChild.classList.toggle('carousel__next');
            }, 10);
        }, delay);
    });
}