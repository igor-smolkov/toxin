import './menu.scss';

import '@comp/button/button';

export default function() {
    const menuElements = document.querySelectorAll('.menu')
    menuElements.forEach(menu => {
        const button = menu.querySelector('.menu__button')
        button.addEventListener('click', () => {
            menu.querySelector('ul').classList.toggle('active')
            button.classList.toggle('active')
        })
    })
}