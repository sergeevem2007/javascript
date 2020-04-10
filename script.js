'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
    };
let isNull = function(n) {
  return isFinite(n) || n === null;
    };


let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'), 
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
    periodAmount = document.querySelector('.period-amount'),
    allInput = document.querySelectorAll('input');

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
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    appData.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.calcSaveMoney();

    this.showResult();
  },
  showResult: function() {
    
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSaveMoney();
    
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
  deleteExpensesBlock: function() {
    let i = 1;
    for (expensesItems[i]; i < 3; i++) {
      expensesItems[i].style.display = 'none';
    }
  },
  deleteIncomeBlock: function() {
    let i = 1;
    for (incomeItems[i]; i < 3; i++) {
      incomeItems[i].style.display = 'none';
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
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  },
  getBudget: function() {
    console.log('this1',this);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    return this.budgetMonth , this.budgetDay;
  },
  getTargetMonth : function() {
    let result = Math.ceil( targetAmount.value / this.budgetMonth );
    if (result <= 0) {
      return ('Цель не будет достигнута');
    } else {
      return ('Цель будет достигнута через ' + result + ' месяцев');
    }
  },
  getStatusIncome: function() {
    if (this.budgetDay <= 0) {
      return ('Что-то пошло не так');
    } else if (this.budgetDay <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay <= 1200) {
      return ('У вас средний уровень дохода');
    } else {
      return ('У вас высокий уровень дохода');
    }
  },
  getInfoDeposit: function() {
    if(this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?');
      }
      while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?');
      }
      while (!isNumber(this.moneyDeposit));
    }
  },
  calcSaveMoney: function() {
    return this.budgetMonth * periodSelect.value;
  },
  changeButton: function() {
    start.style.display = 'none';
    cancel.style.display = 'block';
    for (let i = 0; i < allInput.length; i++) {
      allInput[i].disabled = 'disabled';
    }
  },
  reset: function() {
    console.log('reset');
    for (let i = 0; i < allInput.length; i++) {
      allInput[i].value = '';
      allInput[i].disabled = '';
    }
    appData.deleteExpensesBlock();
    appData.deleteIncomeBlock();
    periodSelect.value = 1;
    periodAmount.innerHTML = '1';
    start.style.display = 'block';
    cancel.style.display = 'none';
    start.disabled = 'disabled';
  }
};
let eventFunc = function (event) { 
  periodAmount.innerHTML = periodSelect.value;
}


let eventFunc2 = function (event) { 
  incomePeriodValue.value = appData.calcSaveMoney();
}
periodSelect.addEventListener('input', eventFunc2);


salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value !== '') {
    start.disabled = ''; 
  }
});
start.addEventListener('click', appData.start.bind(appData));
start.addEventListener('click', appData.changeButton);
cancel.addEventListener('click', appData.reset);

console.log(allInput);


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