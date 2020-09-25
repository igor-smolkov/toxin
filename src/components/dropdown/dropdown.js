import { apply } from "file-loader";

export default function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(event){
            if ((event.target.lastChild) && (event.target.lastChild.className === 'dropdown__menu')){
                event.target.classList.toggle('dropdown_expanded');
            }
        });

        const itemCounters = dropdown.querySelectorAll('.dropdown__item_counter');
        itemCounters.forEach(itemCounter => {
            itemCounter.firstChild.addEventListener('click', function(){
                if (itemCounter.childNodes[1].innerHTML*1-1 > 0) {
                    itemCounter.childNodes[1].innerHTML = itemCounter.childNodes[1].innerHTML*1-1;
                    if (isGuest) {
                        field.value = guestGrammar(itemCounters[0].childNodes[1].innerHTML*1+itemCounters[1].childNodes[1].innerHTML*1+itemCounters[2].childNodes[1].innerHTML*1+'');
                    } else {
                        field.value = guestGrammar(itemCounters[0].childNodes[1].innerHTML, itemCounters[0].previousSibling.innerHTML)+', '+
                            guestGrammar(itemCounters[1].childNodes[1].innerHTML, itemCounters[1].previousSibling.innerHTML)+'...'
                    }    
                } else {
                    itemCounter.childNodes[1].innerHTML = '0';
                    itemCounter.firstChild.className = 'dropdown__item_btn dropdown__item_btn_disabled';

                    if(itemCounters[0].childNodes[1].innerHTML*1+itemCounters[1].childNodes[1].innerHTML*1+itemCounters[2].childNodes[1].innerHTML*1 === 0){
                        field.value = '';
                        field.placeholder = isGuest ? 'Сколько гостей' : '';
                    } else {
                        if (isGuest) {
                            field.value = guestGrammar(itemCounters[0].childNodes[1].innerHTML*1+itemCounters[1].childNodes[1].innerHTML*1+itemCounters[2].childNodes[1].innerHTML*1+'');
                        } else {
                            field.value = guestGrammar(itemCounters[0].childNodes[1].innerHTML, itemCounters[0].previousSibling.innerHTML)+', '+
                                guestGrammar(itemCounters[1].childNodes[1].innerHTML, itemCounters[1].previousSibling.innerHTML)+'...';
                        }                        
                    }
                }
            });
            itemCounter.lastChild.addEventListener('click', function(){
                if (itemCounter.childNodes[1].innerHTML*1 === 0) {
                    itemCounter.firstChild.className = 'dropdown__item_btn';
                    itemCounter.firstChild.disabled = false;
                }
                if (itemCounter.childNodes[1].innerHTML*1+1 < 100) {
                    itemCounter.childNodes[1].innerHTML = itemCounter.childNodes[1].innerHTML*1+1;
                    if (isGuest) {
                        field.value = guestGrammar(itemCounters[0].childNodes[1].innerHTML*1+itemCounters[1].childNodes[1].innerHTML*1+itemCounters[2].childNodes[1].innerHTML*1+'');
                    } else {
                        field.value = guestGrammar(itemCounters[0].childNodes[1].innerHTML, itemCounters[0].previousSibling.innerHTML)+', '+
                            guestGrammar(itemCounters[1].childNodes[1].innerHTML, itemCounters[1].previousSibling.innerHTML)+'...';
                    }    
                }
            });

            function guestGrammar(value, other) {
                if (value[value.length-1].match(/0|[5-9]/g) || (value*1>10 && value*1<20)) {
                    if (other == 'спальни') {
                        value += ' спален'
                    } else if (other == 'кровати') {
                        value += ' кроватей'
                    } else {
                        value += ' гостей';
                    }
                } else if (value[value.length-1].match(/1/g)) {
                    if (other == 'спальни') {
                        value += ' спаленя'
                    } else if (other == 'кровати') {
                        value += ' кровать'
                    } else {
                        value += ' гость';
                    }
                } else {
                    if (other == 'спальни') {
                        value += ' спалени'
                    } else if (other == 'кровати') {
                        value += ' кровати'
                    } else {
                        value += ' гостя';
                    }
                }
                return value;
            }
        })

        const clearBtn = dropdown.querySelector('.dropdown__clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', function(){
                dropdown.firstChild.value = '';
                dropdown.firstChild.placeholder = isGuest ? 'Сколько гостей' : '';
                itemCounters.forEach(itemCounter => {
                    itemCounter.childNodes[1].innerHTML = '0';
                    itemCounter.firstChild.className = 'dropdown__item_btn dropdown__item_btn_disabled';
                });
            });
        }

        const applyBtn = dropdown.querySelector('.dropdown__apply');
        if (applyBtn) {
            applyBtn.addEventListener('click', function(){
                if (dropdown.lastChild.className === 'dropdown__menu'){
                    dropdown.classList.toggle('dropdown_expanded');
                }
            });
        }

        const field = dropdown.querySelector('.field');
        const isGuest = field.value.match(/гост/g) ? true : false;
        field.addEventListener('input', function(event){
            let value = 0;
            if (event.target.value.match(/\d+/g)) {
                value = event.target.value.match(/\d+/g);
            } else {
                itemCounters[0].childNodes[1].innerHTML = 0;
                itemCounters[1].childNodes[1].innerHTML = 0;
                itemCounters[2].childNodes[1].innerHTML = 0;
            }
            if (value[0] < 100) {
                if (value[0]-itemCounters[1].childNodes[1].innerHTML*1+itemCounters[2].childNodes[1].innerHTML*1 > 0 ){
                    itemCounters[0].childNodes[1].innerHTML = value[0]-itemCounters[1].childNodes[1].innerHTML*1+itemCounters[2].childNodes[1].innerHTML*1;
                } else {
                    itemCounters[0].childNodes[1].innerHTML = value[0];
                    itemCounters[1].childNodes[1].innerHTML = 0;
                    itemCounters[2].childNodes[1].innerHTML = 0;
                }
            }
            if (value[1] < 100) {
                itemCounters[0].childNodes[1].innerHTML = value[0];
                if (value[1]-itemCounters[2].childNodes[1].innerHTML*1 > 0) {
                    itemCounters[1].childNodes[1].innerHTML = value[1]-itemCounters[2].childNodes[1].innerHTML*1;
                } else {
                    itemCounters[1].childNodes[1].innerHTML = value[1];
                    itemCounters[2].childNodes[1].innerHTML = 0;
                }
            }
            if (value[2] < 100) {
                itemCounters[0].childNodes[1].innerHTML = value[0];
                itemCounters[1].childNodes[1].innerHTML = value[1];
                itemCounters[2].childNodes[1].innerHTML = value[2];
            }
        });
    });
}