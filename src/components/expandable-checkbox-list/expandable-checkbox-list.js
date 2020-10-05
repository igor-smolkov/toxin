export default function() {
    const expandableCheckboxLists = document.querySelectorAll('.expandable-checkbox-list');
    expandableCheckboxLists.forEach(expandableCheckboxList => {
        expandableCheckboxList.previousSibling.addEventListener('click', function(){
            if ((expandableCheckboxList.lastChild) && (expandableCheckboxList.lastChild.className === 'expandable-checkbox-list__item')){
                expandableCheckboxList.classList.toggle('expandable-checkbox-list_expanded');
            }
        });
        expandableCheckboxList.addEventListener('click', function(){
            if ((expandableCheckboxList.lastChild) && (expandableCheckboxList.lastChild.className === 'expandable-checkbox-list__item')){
                expandableCheckboxList.classList.toggle('expandable-checkbox-list_expanded');
            }
        });
    });
}