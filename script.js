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
let budgetMonth;
let timeMission;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
budgetDay = money / 30;
console.log(budgetDay);

money = prompt('Ваш месячный доход?');
money *= 1;
console.log(money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Еcли у вас есть депозит в банке, нажмите "ОК", если нет - "Отмена"');
expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = prompt('Во сколько это обойдется?');
amount1 *= 1;
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = prompt('Во сколько это обойдется?');
amount2 *= 1;
budgetMonth = money - ( amount1 + amount2 );
console.log('Бюджет на месяц ' + budgetMonth);
timeMission = Math.ceil( mission / budgetMonth );
console.log('Цель будет достигнута через ' + timeMission + ' месяцев');
budgetDay = Math.floor( budgetMonth / 30 );
console.log('Бюджет на день : ' + budgetDay);

if (budgetDay <= 0) {
  alert('Что-то пошло не так');
} else {
  if (budgetDay <= 600) {
    alert('К сожалению у вас уровень дохода ниже среднего');
  } else {
    if (budgetDay <= 1200) {
      alert('У вас средний уровень дохода');
    } else {
      alert('У вас высокий уровень дохода');
    }
  }
}