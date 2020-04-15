'use strict';

const isNumber = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
    };
const isNull = n => {
  return isFinite(n) || n === null;
    };


const start = document.getElementById('start'), 
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
      expensesTitle = document.querySelector('input.expenses-title'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount');
let   incomeItems = document.querySelectorAll('.income-items'),
      expensesItems = document.querySelectorAll('.expenses-items');


class AppData {
  constructor(){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }
  start() {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getExpensesMonth();
    this.getIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.calcSaveMoney();
  
    this.showResult();
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSaveMoney();
    
  }
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem , expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  }
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem , incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
    }
  }
  deleteExpensesBlock() {
    if (expensesItems.length > 1){
      for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].style.display = 'none';
        expensesItems[i].remove();
      }
    }
  }
  deleteIncomeBlock() {
    if (incomeItems.length > 1){
      for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].style.display = 'none';
        incomeItems[i].remove();
      }
    }
  }
  getExpenses() {
    expensesItems.forEach( item => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    }); 
  }
  getIncome() {
    incomeItems.forEach( item => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach( item => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
      });
  }
  getAddIncome() {
    additionalIncomeItem.forEach( item => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  }
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    return this.budgetMonth , this.budgetDay;
  }
  getTargetMonth() {
    const result = Math.ceil( targetAmount.value / this.budgetMonth );
    if (result <= 0) {
      return ('Цель не будет достигнута');
    } else {
      return ('Цель будет достигнута через ' + result + ' месяцев');
    }
  }
  getStatusIncome() {
    if (this.budgetDay <= 0) {
      return ('Что-то пошло не так');
    } else if (this.budgetDay <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay <= 1200) {
      return ('У вас средний уровень дохода');
    } else {
      return ('У вас высокий уровень дохода');
    }
  }
  getInfoDeposit() {
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
  }
  calcSaveMoney() {
    return this.budgetMonth * periodSelect.value;
  }
  changeButton() {
    start.style.display = 'none';
    cancel.style.display = 'block';
    const allInput = document.querySelectorAll('input');
    for (let i = 0; i < allInput.length; i++) {
      allInput[i].disabled = 'disabled';
      incomeAdd.disabled = 'disabled';
      expensesAdd.disabled = 'disabled';
    }
  }
  reset() {
    const allInput = document.querySelectorAll('input');
    for (let i = 0; i < allInput.length; i++) {
      allInput[i].value = '';
      allInput[i].disabled = '';
    }
    this.deleteExpensesBlock();
    this.deleteIncomeBlock();
    periodSelect.value = 1;
    this.budgetMonth = 0;
    this.budgetDay = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    additionalExpensesValue.value = 'Наименование';
    additionalIncomeValue.value = 'Наименование';
    periodAmount.innerHTML = '1';
    start.style.display = 'block';
    cancel.style.display = 'none';
    start.disabled = 'disabled';
    incomeAdd.disabled = '';
    expensesAdd.disabled = '';
    expensesAdd.style.display = '';
    incomeAdd.style.display = '';
  }
  eventListeners() {
    const eventFunc = event => { 
      periodAmount.innerHTML = periodSelect.value;
    }
    const eventFunc2 = event => { 
      incomePeriodValue.value = this.calcSaveMoney();
    }
    periodSelect.addEventListener('input', eventFunc2.bind(this));
    start.addEventListener('click', this.start.bind(this));
    start.addEventListener('click', this.changeButton.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
  
    expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
    incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
    periodSelect.addEventListener('input', eventFunc.bind(this));
    salaryAmount.addEventListener('input', () => {
      if (salaryAmount.value !== '') {
        start.disabled = ''; 
      }
    });
  }
}

const appData = new AppData();

appData.eventListeners();

console.log(appData);






// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
//   console.log(key + ': ' + appData[key]);
//   if (key === 'income') {
//     for (let item in appData.income) {
//       console.log(item + ': ' + appData.income[item]);
//     }
//   }
//   if (key === 'expenses') {
//     for (let value in appData.expenses) {
//       console.log(value + ': ' + appData.expenses[value]);
//     }
//   }
// }

// for (let i = 1; i < appData.addExpenses.length ; i++) {
//   appData.addExpenses[0] = appData.addExpenses[0].charAt(0).toUpperCase()+appData.addExpenses[0].slice(1);
//   appData.addExpenses[i] = ' ' + appData.addExpenses[i].charAt(0).toUpperCase()+appData.addExpenses[i].slice(1);
// }
// let a = appData.addExpenses.toString();
// console.log(a);