const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
        form = document.querySelectorAll('form'),
        statusMessage = document.createElement('div');
  statusMessage.style.cssText = `
  font-size: 2rem;
  z-index : 1;
  color : #ffffff;
  `;
  
  for (let element of form) {
    element.addEventListener('submit', (event) =>{
      event.preventDefault();
      element.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(element);
      let body = {};
      for (let value of formData.entries()) {
        body[value[0]] = value[1];
      }
      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200');
          }
        })
        .then( () => {
          statusMessage.textContent = successMessage;
          clearInput(element);
          setTimeout( () => {
            statusMessage.textContent = '';
          }, 5000);
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error)
        });
    });
  }; 
  const postData = (body) => {
    return fetch('server.php', {
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