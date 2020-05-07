const validateForm = () => {
  const input = document.querySelectorAll('.calc-block>input');
  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('input', () => {
      input[i].value = input[i].value.replace(/[^\d]/g, '');
    });
  }
};

export default validateForm;