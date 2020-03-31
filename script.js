'use strict';

let money = 35000;
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка'; 
let deposit = true;
let mission = 100000;
let period = 5;
let budgetDay;
let expenses1;
let expenses2;
let amount1;
let amount2;
let timeMission;
let accumulatedMonth;

const showTypeOf = function (data) {
  console.log(typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

money = +prompt('Ваш месячный доход?');
console.log(money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Еcли у вас есть депозит в банке, нажмите "ОК", если нет - "Отмена"');
expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = +prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = +prompt('Во сколько это обойдется?');

const getStatusIncome = function () {
  if (budgetDay <= 0) {
    return ('Что-то пошло не так');
  } else {
    if (budgetDay <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      if (budgetDay <= 1200) {
        return ('У вас средний уровень дохода');
      } else {
        return ('У вас высокий уровень дохода');
      }
    }
  }
}

console.log(getStatusIncome());

const getExpensesMonth = function () {
  return amount1 + amount2;
};
const getAccumulatedMonth = function () {
  return money - (amount1 + amount2);
};

getExpensesMonth();
console.log(getExpensesMonth());

accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function () {
  return Math.ceil( mission / accumulatedMonth );
};

console.log(addExpenses);
console.log(getTargetMonth());
console.log('Бюджет на месяц ' + getAccumulatedMonth());
timeMission = Math.ceil( mission / getAccumulatedMonth() );
console.log('Цель будет достигнута через ' + timeMission + ' месяцев');
budgetDay = Math.floor( getAccumulatedMonth() / 30 );
console.log('Бюджет на день : ' + budgetDay);