import './calendar.scss';
import $ from 'jquery'
import datepickerFactory from 'jquery-datepicker';
import datepickerRUFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';

class Calendar {
  constructor($elem) {
    this._$elem = $elem;
    this._dateFrom = new Date(this._$elem.data().from);
    this._dateTo = new Date(this._$elem.data().to);
    this._$pluginElem = this._$elem.find('.calendar__plugin');
    this._initPlugin();
  }
  _initPlugin() {
    datepickerFactory($);
    datepickerRUFactory($);
    $(()=>{
      this._$pluginElem.datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        beforeShowDay: (date) => this._checkDayInPeriod(date),
      }); 
      this._$pluginElem.datepicker("setDate", this._dateFrom);
    });
  }
  _checkDayInPeriod(date) {
    const timeFrom = this._dateFrom.getTime();
    const timeTo = this._dateTo.getTime();
    let cur = date.getTime();
    console.log(timeFrom, timeTo, cur)
    let className = '';
    if (cur > timeFrom && cur < timeTo) {
      className += 'ui-datepicker-period ';
      console.log('per')
    }
    if (cur == timeFrom) {
      className += 'ui-datepicker-period-from '
      console.log('timeFrom')
    }
    if (cur === timeTo) {
      className += 'ui-datepicker-period-to '
      console.log('timeTo')
    }
    if (cur === timeFrom && cur === timeTo) {
      className = 'ui-datepicker-period ui-datepicker-period-from ui-datepicker-period-from-to'
    }
    return [true, className];
  }
}

$('.calendar').each((_, elem) => new Calendar($(elem)));

// $(() => {
//     let start = parseDate("2019-08-19");
//     let end = parseDate("2019-08-23");
//     let startDate = "2019-08-19";
//     let endDate = "2019-08-23"

//     $(`.datepicker`).datepicker({
//         beforeShowDay: function(date) {
//             let cur = Date.parse(date);
//             let className = '';
//             if (cur > start && cur < end) {
//                 className = 'ui-datepicker-period';
//             } else if (cur === start) {
//                 if (!end) {
//                     className = 'ui-datepicker-period ui-datepicker-period-start ui-datepicker-period-start-one'
//                 } else {
//                     className = 'ui-datepicker-period ui-datepicker-period-start'
//                 }
//             } else if (cur === end) {
//                 className = 'ui-datepicker-period ui-datepicker-period-end'
//             }
//             return [true, className];
//         },
//         onSelect: function(date){
//             let parse = parseDate(date);
//             let dateStr = date;
//             if (date.indexOf('.') > -1) {
//                 dateStr = [dateStr.split('.')[2], dateStr.split('.')[1], dateStr.split('.')[0]].join('-')
//             }
//             if (!start) {
//                 start = parse;
//                 startDate = dateStr;
//             } else if ((!end)&&(start<parse)) {
//                 end = parse;
//                 endDate = dateStr;
//             } else {
//                 start = parse;
//                 startDate = dateStr;
//                 end = null;
//                 endDate = null;
//             }
//         },
//         showOtherMonths: true,
//         selectOtherMonths: true
//     });

//     function parseDate(date) {
//         let parse;
//         if (date) {
//             if (date.indexOf('.') > -1) {
//                 let arr = [date.split('.')[2], date.split('.')[1], date.split('.')[0]];
//                 parse = Date.parse(new Date(arr.join('-')+'T00:00:00'));
//             } else {
//                 parse = Date.parse(new Date(date+'T00:00:00'));
//             }
//         }
//         return parse
//     };
// });

    // $(function(){
    //     // $(".datepicker_btn").on("click", function(){
    //     //     let id = this.id.substr(14,this.id.length);
    //     //     if ($(".calendar-slot")) { calendar(id); }
    //     //     $(`#calendar${id}`).removeClass("card_none")
    //     // });
    //     // if ($(".calendar-slot")) { calendar(''); }
    //     calendar('');

    //     function calendar(n=''){
    //         // let start = parseDate($(`#datepicker${n}_value1-field`).val());
    //         // let end = parseDate($(`#datepicker${n}_value2-field`).val());
    //         // let startDate = $(`#datepicker${n}_value1-field`).val();
    //         // let endDate = $(`#datepicker${n}_value2-field`).val();

    //         let start = parseDate("2019-08-19");
    //         let end = parseDate("2019-08-23");
    //         let startDate = "2019-08-19";
    //         let endDate = "2019-08-23"

    //         // $(`#datepicker${n}`).datepicker({
    //         $(`.datepicker`).datepicker({
    //             beforeShowDay: function(date) {
    //                 let cur = Date.parse(date);
    //                 let className = '';
    //                 if (cur > start && cur < end) {
    //                     className = 'ui-datepicker-period';
    //                 } else if (cur === start) {
    //                     if (!end) {
    //                         className = 'ui-datepicker-period ui-datepicker-period-start ui-datepicker-period-start-one'
    //                     } else {
    //                         className = 'ui-datepicker-period ui-datepicker-period-start'
    //                     }
    //                 } else if (cur === end) {
    //                     className = 'ui-datepicker-period ui-datepicker-period-end'
    //                 }
    //                 return [true, className];
    //             },
    //             onSelect: function(date){
    //                 let parse = parseDate(date);
    //                 let dateStr = date;
    //                 if (date.indexOf('.') > -1) {
    //                     dateStr = [dateStr.split('.')[2], dateStr.split('.')[1], dateStr.split('.')[0]].join('-')
    //                 }
    //                 if (!start) {
    //                     start = parse;
    //                     startDate = dateStr;
    //                 } else if ((!end)&&(start<parse)) {
    //                     end = parse;
    //                     endDate = dateStr;
    //                 } else {
    //                     start = parse;
    //                     startDate = dateStr;
    //                     end = null;
    //                     endDate = null;
    //                 }
    //             },
    //             showOtherMonths: true,
    //             selectOtherMonths: true
    //         });

    //         let set = $(`#datepicker${n}_value1`).val()
    //         if (set) {
    //             if (set.indexOf('-') > -1) {
    //                 set = [set.split('-')[2], set.split('-')[1], set.split('-')[0]].join('.')
    //             }      
    //         }      
    //         $(`#datepicker${n}`).datepicker("setDate", set);

    //         function parseDate(date) {
    //             let parse;
    //             if (date) {
    //                 if (date.indexOf('.') > -1) {
    //                     let arr = [date.split('.')[2], date.split('.')[1], date.split('.')[0]];
    //                     parse = Date.parse(new Date(arr.join('-')+'T00:00:00'));
    //                 } else {
    //                     parse = Date.parse(new Date(date+'T00:00:00'));
    //                 }
    //             }
    //             return parse
    //         };

    //         $(`#calendar__clear_${n}`).on("click", function(){
    //             start = null;
    //             end = null;
    //             startDate = null;
    //             endDate = null;
    //             $(`#datepicker${n}`).datepicker("refresh");
    //             $(`#datepicker${n}_value1`).val(null);
    //             $(`#datepicker${n}_value2`).val(null);
    //         });
    //         $(`#calendar__apply_${n}`).on("click", function(){
    //             $(`#calendar${n}`).addClass("card_none");
    //             $(`#datepicker${n}_value1`).val(startDate);
    //             $(`#datepicker${n}_value2`).val(endDate);
    //             $(`#datepicker${n}`).datepicker("destroy");
    //         });
    //     }
    // });