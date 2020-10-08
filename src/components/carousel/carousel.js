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