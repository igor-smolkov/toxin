import $ from 'jquery'
import datepickerFactory from 'jquery-datepicker';
import datepickerRUFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';
export default function() {
    let calendar = document.querySelector('.calendar');
    calendar.innerHTML= '<div id="datepicker"></div><input type="hidden" id="datepicker_value" value="01.08.2019">';
    datepickerFactory($);
    datepickerRUFactory($);
    $(function(){
        $("#datepicker").datepicker({
            onSelect: function(date){
                $('#datepicker_value').val(date)
            },
            showOtherMonths: true,
            selectOtherMonths: true
        });
        $("#datepicker").datepicker("setDate", $('#datepicker_value').val());
    });
}