import $ from 'jquery'
import datepickerFactory from 'jquery-datepicker';
import datepickerRUFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';
export default function() {
    let calendar = document.querySelector('.calendar');
    calendar.innerHTML= '<div id="datepicker"></div><input type="hidden" id="datepicker_value1" value="19.08.2019"><input type="hidden" id="datepicker_value2" value="23.08.2019">';
    datepickerFactory($);
    datepickerRUFactory($);
    $(function(){
        let start = parseDate($("#datepicker_value1").val());
        let end = parseDate($("#datepicker_value2").val());
        console.log(start+'|'+end);
        $("#datepicker").datepicker({
            beforeShowDay: function(date) {
                let cur = Date.parse(date);
                let className = '';
                if (cur > start && cur < end) {
                    className = 'ui-datepicker-period';
                } else if (cur === start) {
                    if (!end) {
                        className = 'ui-datepicker-period ui-datepicker-period-start ui-datepicker-period-start-one'
                    } else {
                        className = 'ui-datepicker-period ui-datepicker-period-start'
                    }
                } else if (cur === end) {
                    className = 'ui-datepicker-period ui-datepicker-period-end'
                }
                return [true, className];
            },
            onSelect: function(date){
                let parse = parseDate(date);
                if (!start) {
                    start = parse;
                } else if ((!end)&&(start<parse)) {
                    end = parse;
                } else {
                    start = parse;
                    end = null;
                }
            },
            showOtherMonths: true,
            selectOtherMonths: true
        });
        $("#datepicker").datepicker("setDate", $('#datepicker_value1').val());
        function parseDate(date) {
            let arr = [date.split('.')[2], date.split('.')[1], date.split('.')[0]];
            let parse = Date.parse(new Date(arr.join('-')+'T00:00:00'));
            return parse
        }
    });
}