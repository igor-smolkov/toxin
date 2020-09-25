export default function() {
    const expandableCheckboxLists = document.querySelectorAll('.expandable-checkbox-list');
    expandableCheckboxLists.forEach(expandableCheckboxList => {
        console.log(expandableCheckboxList.previousSibling);
        expandableCheckboxList.previousSibling.addEventListener('click', function(){
            console.log(expandableCheckboxList.lastChild.className);
            if ((expandableCheckboxList.lastChild) && (expandableCheckboxList.lastChild.className === 'expandable-checkbox-list__item')){
                expandableCheckboxList.classList.toggle('expandable-checkbox-list_expanded');
            }
        });
    });
}