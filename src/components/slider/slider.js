export default function() {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        let isChange = false;
        let isLeftBtn = false;
        let isRightBtn = false;
        slider.firstChild.addEventListener('click', function(event){
            const isLeft = event.offsetX < event.target.nextSibling.offsetLeft ? true : false;
            const point = event.offsetX < 0 ? 0 : isLeft ? event.offsetX+2 : event.offsetX;
            const container = event.target.offsetWidth;
            const pointPer = point / container * 100;
            if (isLeft) {
                const selectedWidthPer = (event.target.nextSibling.offsetWidth+(event.target.nextSibling.offsetLeft-point)) / container * 100;
                event.target.nextSibling.style = `left: ${pointPer}%; width:${selectedWidthPer}%`;
            } else {
                const selectedWidthPer = (point-event.target.nextSibling.offsetLeft) / container * 100;
                event.target.nextSibling.style.width = `${selectedWidthPer}%`;
            }
        });
        slider.lastChild.addEventListener('mousedown', function(event){
            isLeftBtn = event.offsetX+9 < 10;
            isRightBtn = isLeftBtn ? false : event.offsetX+9 > event.target.offsetWidth;
            isChange = true;
        });
        slider.addEventListener('mouseover', function(event){
            if (isChange) {
                if (isLeftBtn) {
                    console.log(event.target.lastChild.offsetWidth);
                    event.target.lastChild.style = `left: ${event.offsetX}px; width: ${event.target.lastChild.offsetWidth+(event.target.lastChild.offsetLeft-event.offsetX)}px;`;
                }
            }
        })
        slider.addEventListener('mouseup', function(event){
            isChange = false;
            isLeftBtn = false;
            isRightBtn = false;
        })
    });
}