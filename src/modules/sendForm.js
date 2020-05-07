const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3'),
        form = [form1, form2, form3];
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `
  font-size: 2rem;
  z-index : 1;
  color : #ffffff;
  `;
  form.forEach( (elem , index) => {
    form[index].addEventListener('submit', (event) =>{
      event.preventDefault();
      form[index].appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form[index]);
      let body = {};
      for (let value of formData.entries()) {
        body[value[0]] = value[1];
      }
      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200')
          }
          statusMessage.textContent = successMessage;
          clearInput(form[index]);
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error)
        });
    });
  }); 
  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json'
      },
      body:JSON.stringify(body)
    });
  };
  const clearInput = (target) => {
    for (let i = 0; i < target.length; i++) {
      target[i].value = '';
    }
  };
};

export default sendForm;