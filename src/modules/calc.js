const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');
  const countSum = () => {
    let total = 0,
        countValue = 1,
        dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value,
          squareValue = +calcSquare.value;
    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }
    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }
    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
      total = Math.ceil(total);
    };    
    if (total !== 0) {
      printTotal(0, total);
    }
  };
  const printTotal = (from, to) => {
    let current = from;
    let timerId = setInterval(() => {
      totalValue.textContent = current;
      if (to != 0 && to >= 6000 && (current+1000) <= to) {
        current += 1000;
      } else if ((current+100) <= to) {
        current += 100;
      } else if (current+10 <= to) {
        current += 10;
      } else if (current < to) {
        current++;
      } else if (current == to) {
        clearInterval(timerId);
      }
    }, 20);
  }
  
  
  calcBlock.addEventListener('input', (event) => {
    const target = event.target;
    if (target.matches('select') || target.matches('input')) {
      countSum();  
    }
  });
};

export default calc;