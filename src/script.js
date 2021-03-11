import '@/style.scss'
import $ from 'jquery'

import calendar from '@comp/calendar/calendar.js'
import dropdown from '@comp/dropdown/dropdown';
import expandableCheckboxList from '@comp/expandable-checkbox-list/expandable-checkbox-list';
import slider from '@comp/slider/slider';
import like from '@comp/like/like';
import carousel from '@comp/carousel/carousel';
import menu from '@comp/menu/menu';

calendar();
dropdown();
expandableCheckboxList();
slider();
like();
carousel();
menu()

// import '@comp/colors-style/colors-style.scss'
import '@comp/type-style/type-style.scss'
import '@comp/logo/logo.scss'
import '@comp/color-section/color-section.scss'
import '@comp/type-section/type-section.scss'
import '@comp/form-section/form-section.scss'
import '@comp/text-field/text-field.scss'
import '@comp/dropdown-field/dropdown-field.scss'