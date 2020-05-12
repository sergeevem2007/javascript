const validateInput = () => {
  const form = document.querySelectorAll('form');
  for (let i = 0; i < form.length; i++) {
    form[i].addEventListener('input', ()=>{
      const inputs = form[i].querySelectorAll('input');
      const formButton =  form[i].querySelector('.form-btn');
      for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input' , () =>{
        let target = event.target;
        if (target.name === 'user_name' || target.name === 'top-form') {
          target.value = target.value.replace(/[^а-я\s]/gi, '');
        } else if (target.name === 'user_message'){
          target.value = target.value.replace(/[^а-я\s\.\,\?\!\-\(\)\'\"\:\;]/gi, '');
        } else if (target.name === 'user_phone') {
          const mask = /^\+?[\d]{8,18}$/g;
          target.value = target.value.replace(/[^\d+]/g, '');
          let valid = mask.test(target.value);
          if (valid) {
            target.style.border = '';
            formButton.disabled = false;
          } else {
            target.style.border = '2px solid red';
            formButton.disabled = true;
          }
        }
      });
      }
    })
  }
};

export default validateInput;