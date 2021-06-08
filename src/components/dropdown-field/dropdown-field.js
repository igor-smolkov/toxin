import './dropdown-field.scss'

class Counter {
  constructor($elem, dropdown) {
    this._$elem = $elem;
    this._dropdown = dropdown;
    this._$minusButton = this._findMinusButton();
    this._$plusButton = this._findPlusButton();
    this._$countField = this._findCountField();

    this.count = +this._$countField.text();

    this._$minusButton.on('click', (e) => this._handleMinusButtonClick(e));
    this._$plusButton.on('click', (e) => this._handlePlusButtonClick(e));
  }
  decrementCount() {
    this.setCount(this.count-1);
  }
  incrementCount() {
    this.setCount(this.count+1);
  }
  disabledMinusButton(isTrue = true) {
    if (isTrue) {
      this._$minusButton.toggleClass('dropdown-counter__button_disabled');
    } else {
      this._$minusButton.removeClass('dropdown-counter__button_disabled');
    }
    this._$minusButton.prop('disabled', isTrue);
  }

  setCount(value) {
    this.count = value;
    this._updateCountField();
    this.disabledMinusButton(this.count === 0);
  }
  getCount() {
    return this.count
  }
  reset() {
    this.count = 0;
    this._updateCountField();
    this.disabledMinusButton(true);
  }

  _handleMinusButtonClick(e) {
    e.preventDefault();
    this.decrementCount();
    // this._dropdown._handlePlusMinusButton(false);
  }
  _handlePlusButtonClick(e) {
    e.preventDefault();
    this.incrementCount();
    // this._dropdown._handlePlusMinusButton(true);
  }
  _updateCountField() {
    this._$countField.text(this.count.toString());
  }
  _findMinusButton() {
    return this._findButtonByIndex(0);
  }
  _findPlusButton() {
    return this._findButtonByIndex(1);
  }
  _findButtonByIndex(index) {
    return $(this._$elem.find('.dropdown-counter__button')[index]);
  }
  _findCountField() {
    return $(this._$elem.find('.dropdown-counter__count'));
  }
}

class Dropdown {
  constructor($elem) {
    this._$elem = $elem;
    this._counters = this._initCounters();

    this._$textField = this._findTextField();
    this._$textField.on('input', (e)=>this._handleTextFieldInput(e));
    this._list = this._initList();
  }
  _initCounters() {
    const counters = [];
    this._$elem.find('.dropdown-counter').each((_, counter) => {
      counters.push(new Counter($(counter), this));
    })
    return counters;
  }

  resetCounters() {
    this.counters.forEach(counter => {
      counter.reset();
    });
  }
  _handleTextFieldInput(e) {
    e.preventDefault();
    const matchValues = e.target.value.match(/\d+/g);
    let values = matchValues ? matchValues : this.resetCounters();
    values.forEach((value, indexValue) => {
      if (value < 100) {
        const count = value - this.counters.reduce((acc, counter, indexCounter) => {
          if (indexCounter <= indexValue) return
          return acc += counter.getCount()
        }, 0);
        this.resetCounters();
        this.counters.
          filter((_, indexCounter) => indexCounter <= indexValue).
          forEach(counter => counter.setCount(count > 0 ? count : value));
      }
    });
  }
  _handlePlusMinusButton(sign = true) {
    const countSum = this._counters.reduce((acc, counter) => acc += counter.getCount(), 0)
    if (countSum === 0 && !sign) {
      this._$textField.val('');
      this._$textField.attr('placeholder', this._isGuest() ? 'Сколько гостей' : '');
    } else {
      if (this._isGuest()) {
        this._$textField.val(guestGrammar(countSum.toString()));
      } else {
        let value = '';
        this._counters.forEach((counter, index) => {
          if (index === this._counters.length-1) return;
          value += `${guestGrammar(counter.getCount(), this._list[index])}, `
        });
        this._$textField.val(`${value}...`);
      }
    } 
  }
  _findTextField() {
    return $(this._$elem.find('.text-field'));
  }
  _isGuest() {
    return this._$textField.val().match(/гост/g) ? true : false;
  }
  _initList() {
    const list = [];
    this._$elem.find('.dropdown-item__name').each((_, item) => {
      list.push($(item).text());
    })
    return list;
  }
}

$('.dropdown').each((_, elem) => new Dropdown($(elem)))

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