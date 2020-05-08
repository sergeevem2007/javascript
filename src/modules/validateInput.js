const validateInput = () => {
  const inputs = document.querySelectorAll('input');
  const formButtons =  document.querySelectorAll('.form-btn');
  for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input' , () =>{
    let target = event.target;
    if (target.name === 'user_name' || target.name === 'user_message' || target.name === 'top-form') {
      target.value = target.value.replace(/[^а-я\s]/gi, '');
    } else if (target.name === 'user_phone') {
      const mask = /^\+?[\d]{8,18}$/g;
      target.value = target.value.replace(/[^\d+]/g, '');
      let valid = mask.test(target.value);
      if (valid) {
        target.style.border = '';
        for (let i = 0; i < formButtons.length; i++){
          formButtons[i].disabled = false;
          }
        } else {
        target.style.border = '2px solid red';
        for (let j = 0; j < formButtons.length; j++){
          formButtons[j].disabled = true;
          }
      }
    }
  });
  }
};

export default validateInput;