let money = 35000;
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка'; 
let deposit = true;
let mission = 100000;
let period = 5;
let budgetDay;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
budgetDay = money / 30;
console.log(budgetDay);
