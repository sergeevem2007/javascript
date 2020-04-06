'use strict';
let money;
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
    };
let isNull = function(n) {
  return isFinite(n) || n === null;
    };
let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};
start();

let appData = {
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  asking: function() {
    if (confirm('Есть ли у вас дополнительный заработок?')) {
      let itemIncome , cashIncome;
      do {
        itemIncome = prompt('Какой у вас есть дополнительный заработок?');
        console.log(itemIncome);
      }
      while (isNumber(itemIncome) || isNull(itemIncome));
      do { cashIncome = prompt('Сколько в месяц зарабатываете?');
      }
      while (!isNumber(cashIncome));
      
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses;
    do {
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    }
    while (isNumber(addExpenses) || isNull(addExpenses));
      appData.addExpenses = addExpenses.toLowerCase().split(', ');
      appData.deposit = confirm('Еcли у вас есть депозит в банке, нажмите "ОК", если нет - "Отмена"');
    let cost, questionExpenses;
      for (let i = 0; i < 2; i++) {
        do {
          questionExpenses = prompt('Введите обязательную статью расходов?');
        }
        while (isNumber(questionExpenses) || isNull(questionExpenses));   
        do {
          cost = prompt('Во сколько это обойдется?');
        }
        while (!isNumber(cost));
        appData.expenses[questionExpenses] = +cost;
      }
  },
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    return appData.budgetMonth , appData.budgetDay;
  },
  getTargetMonth : function() {
    let result = Math.ceil( appData.mission / appData.budgetMonth );
    if (result <= 0) {
      return ('Цель не будет достигнута');
    } else {
      return ('Цель будет достигнута через ' + result + ' месяцев');
    }
  },
  getStatusIncome: function() {
    if (appData.budgetDay <= 0) {
      return ('Что-то пошло не так');
    } else if (appData.budgetDay <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay <= 1200) {
      return ('У вас средний уровень дохода');
    } else {
      return ('У вас высокий уровень дохода');
    }
  },
  getInfoDeposit: function() {
    if(appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?');
      }
      while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?');
      }
      while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSaveMoney: function() {
    return appData.budgetMonth * appData.period;
  }  
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();
appData.calcSaveMoney();

console.log(appData.budget);
console.log('Бюджет на месяц ' + appData.budgetMonth);
console.log('Бюджет на день : ' + appData.budgetDay);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key + ': ' + appData[key]);
  if (key === 'income') {
    for (let item in appData.income) {
      console.log(item + ': ' + appData.income[item]);
    }
  }
  if (key === 'expenses') {
    for (let value in appData.expenses) {
      console.log(value + ': ' + appData.expenses[value]);
    }
  }
}

for (let i = 0; i < appData.addExpenses.length ; i++) {
  appData.addExpenses[i] = ' ' + appData.addExpenses[i].charAt(0).toUpperCase()+appData.addExpenses[i].slice(1);
  appData.addExpenses[0] = appData.addExpenses[0].slice(1);
}
let a = appData.addExpenses.toString();
console.log(a);