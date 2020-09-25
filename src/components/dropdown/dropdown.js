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
                    field.value = guestGrammar(itemCounters[0].childNodes[1].innerHTML*1+itemCounters[1].childNodes[1].innerHTML*1+itemCounters[2].childNodes[1].innerHTML*1+'');
                } else {
                    itemCounter.childNodes[1].innerHTML = '0';
                    itemCounter.firstChild.className = 'dropdown__item_btn dropdown__item_btn_disabled';
                    if(itemCounters[0].childNodes[1].innerHTML*1+itemCounters[1].childNodes[1].innerHTML*1+itemCounters[2].childNodes[1].innerHTML*1 === 0){
                        field.value = '';
                        field.placeholder = 'Сколько гостей';
                    } else {
                        field.value = guestGrammar(itemCounters[0].childNodes[1].innerHTML*1+itemCounters[1].childNodes[1].innerHTML*1+itemCounters[2].childNodes[1].innerHTML*1+'');
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
                    field.value = guestGrammar(itemCounters[0].childNodes[1].innerHTML*1+itemCounters[1].childNodes[1].innerHTML*1+itemCounters[2].childNodes[1].innerHTML*1+'');
                }
            });

            function guestGrammar(value) {
                if (value[value.length-1].match(/0|[5-9]/g) || (value*1>10 && value*1<20)) {
                    value += ' гостей';
                } else if (value[value.length-1].match(/1/g)) {
                    value += ' гость';
                } else {
                    value += ' гостя';
                }
                return value;
            }
        })

        const clearBtn = dropdown.querySelector('.dropdown__clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', function(){
                dropdown.firstChild.value = '';
                dropdown.firstChild.placeholder = 'Сколько гостей';
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