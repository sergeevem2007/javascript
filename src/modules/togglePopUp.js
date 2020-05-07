const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = popup.querySelector('.popup-content');
  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () =>{
      popup.style.display = 'block';
      if (screen.width > 768) {
        let countTop = 0,
            countOpacity = 0,
            moveInterval,
        moveAnimate = function(){
          moveInterval = requestAnimationFrame(moveAnimate);
          countOpacity += 0.03;
          countTop += 0.3;
          if (countTop <= 10 && countOpacity <= 1) {
            popupContent.style.top = countTop + '%';
            popupContent.style.opacity = countOpacity;
          } else {
          cancelAnimationFrame(moveInterval);
          }
        }
        moveInterval = requestAnimationFrame(moveAnimate); 
      }
    });
  });
  popup.addEventListener('click', (event) =>{
    let target = event.target;
    if (target.classList.contains('popup-close')) {
      popup.style.display = 'none';
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        popup.style.display = 'none';
      }
    }
  });
};

export default togglePopUp;