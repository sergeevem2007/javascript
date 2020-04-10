'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
    };
let isNull = function(n) {
  return isFinite(n) || n === null;
    };


let start = document.getElementById('start'),
    incomeAdd = document.getElementsByTagName('button')[0],
    expensesAdd = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function() {
    
    appData.budget = +salaryAmount.value;
    console.log(salaryAmount.value);
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getInfoDeposit();
    appData.getBudget();
    appData.calcSaveMoney();
    appData.getAddExpenses();
    appData.getAddIncome();
    

    appData.showResult();
  },
  showResult: function() {
    let eventFunc = function (event) { 
      incomePeriodValue.value = appData.calcSaveMoney();
    }
    periodSelect.addEventListener('input', eventFunc);
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSaveMoney();
  },
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem , expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem , incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function() {
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
      });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    return appData.budgetMonth , appData.budgetDay;
  },
  getTargetMonth : function() {
    let result = Math.ceil( targetAmount.value / appData.budgetMonth );
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
    return appData.budgetMonth * periodSelect.value;
  }  
};
let eventFunc = function (event) { 
  periodAmount.innerHTML = periodSelect.value;
}
salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value !== '') {
    start.addEventListener('click', appData.start);
  } else {
    start.removeEventListener('click', appData.start);
  }
});


expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', eventFunc);


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

for (let i = 1; i < appData.addExpenses.length ; i++) {
  appData.addExpenses[0] = appData.addExpenses[0].charAt(0).toUpperCase()+appData.addExpenses[0].slice(1);
  appData.addExpenses[i] = ' ' + appData.addExpenses[i].charAt(0).toUpperCase()+appData.addExpenses[i].slice(1);
}
let a = appData.addExpenses.toString();
console.log(a);