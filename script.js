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
      additionalExpensesItem = document.querySelectorAll('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent');

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
    
    this.getExpInc();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.getAddExpInc();
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
  addExpIncBlock(varValue, btn , classValue) {
    const clone = varValue[0].cloneNode(true);
    varValue[0].parentNode.insertBefore(clone , btn);
    varValue = document.querySelectorAll(`${classValue}`);
    if (varValue.length === 3) {
      btn.style.display = 'none';
    }
  }
  deleteExpIncBlock() {
    const deleteFunc = value => {
      if (value.length > 1){
        for (let i = 1; i < value.length; i++) {
          value[i].style.display = 'none';
          value[i].remove();
        }
      }
    }
    deleteFunc(incomeItems);
    deleteFunc(expensesItems);
  }
  getExpInc() {
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };
    expensesItems.forEach(count);
    incomeItems.forEach(count);
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpInc() {
    const parse = item => {
      if (item.classList.contains('additional_expenses-item')) {
        const itemValue = item.value.split(',');
        for (let i = 0; i < itemValue.length; i++) {
          if (itemValue[i] !== '') {
            this.addExpenses.push(itemValue[i]);
          }
        }
      } else if (item.classList.contains('additional_income-item')) {
        const itemValue2 = item.value.trim();
        if (itemValue2 !== '') {
          this.addIncome.push(itemValue2);
        }
      }     
    };
    additionalExpensesItem.forEach(parse);
    additionalIncomeItem.forEach(parse);
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  calcSaveMoney() {
    return this.budgetMonth * periodSelect.value;
  }
  changeButton() {
    start.style.display = 'none';
    cancel.style.display = 'block';
    depositBank.disabled = true;
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
    this.deleteExpIncBlock();
    periodSelect.value = 1;
    this.budgetMonth = 0;
    this.budgetDay = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    depositCheck.checked = false;
    depositBank.style.display = 'none';
    depositBank.disabled = '';
    depositAmount.style.display = 'none';
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
  changePercent() {
    const valueSelect = this.value;
    console.log(valueSelect);
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.disabled = '';
      depositPercent.value = '';
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change' , this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change' , this.changePercent);
    }
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
  
    expensesAdd.addEventListener('click', this.addExpIncBlock.bind(this,expensesItems,expensesAdd,'.expenses-items'));
    incomeAdd.addEventListener('click', this.addExpIncBlock.bind(this,incomeItems,incomeAdd,'.income-items'));
    periodSelect.addEventListener('input', eventFunc.bind(this));
    salaryAmount.addEventListener('input', () => {
      if (salaryAmount.value !== '') {
        start.disabled = ''; 
      }
    });
    depositPercent.addEventListener('input', () =>{
      if (depositPercent.value !== '') {
        if (!isNumber(depositPercent.value) || depositPercent.value < 0 || depositPercent.value > 100) {
          alert('Введите корректное число от 0 до 100');
          depositPercent.value = '';
        }
      } else {
        start.disabled = 'true';
      }
    });
    depositCheck.addEventListener('change' , this.depositHandler.bind(this));
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