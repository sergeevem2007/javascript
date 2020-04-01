'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'фриланс',
    addExpenses = [], 
    deposit = true,
    mission = 100000,
    period = 5,
    budgetDay,
    expenses = [],
    amount1,
    amount2,
    timeMission,
    accumulatedMonth;

let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};
start();

console.log(money);
console.log(typeof money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.toLowerCase().split(','));

deposit = confirm('Еcли у вас есть депозит в банке, нажмите "ОК", если нет - "Отмена"');

const getExpensesMonth = function () {
  let sum = 0;
  let question = 0;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');   
    do {
      question = prompt('Во сколько это обойдется?');
    }
    while (!isNumber(question));
    sum += +question;
  }
  console.log(expenses);
  return sum;
};


const getAccumulatedMonth = function () {
  return money - expensesAmount;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц ' + expensesAmount);

accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function () {
  let result = Math.ceil( mission / accumulatedMonth );
  if (result <= 0) {
    return ('Цель не будет достигнута');
  } else {
    return result;
  }
};

const getStatusIncome = function () {
  if (budgetDay <= 0) {
    return ('Что-то пошло не так');
  } else if (budgetDay <= 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay <= 1200) {
    return ('У вас средний уровень дохода');
  } else {
    return ('У вас высокий уровень дохода');
  }
};

console.log(addExpenses);
console.log(getTargetMonth());
console.log('Бюджет на месяц ' + getAccumulatedMonth());
timeMission = Math.ceil( mission / getAccumulatedMonth() );
console.log('Цель будет достигнута через ' + timeMission + ' месяцев');
budgetDay = Math.floor( getAccumulatedMonth() / 30 );
console.log('Бюджет на день : ' + budgetDay);
console.log(getStatusIncome());

const showTypeOf = function (data) {
  console.log(typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);