import $ from 'jquery';

import ExpandableList from './ExpandableList';

$('.js-expandable-list').each(
  (_, elem) => new ExpandableList($(elem)),
);
