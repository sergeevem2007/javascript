window.addEventListener('DOMContentLoaded', function(){
  'use strict';

  // Timer
  function countTimer(deadline){
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining(){
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
          return {timeRemaining, hours, minutes, seconds};
    }
    function updateClock(){
      let timer = getTimeRemaining();
      timer.hours < 10 ? timerHours.textContent = '0' + timer.hours : timerHours.textContent = timer.hours;
      timer.minutes < 10 ? timerMinutes.textContent = '0' + timer.minutes : timerMinutes.textContent = timer.minutes;
      timer.seconds < 10 ? timerSeconds.textContent = '0' + timer.seconds : timerSeconds.textContent = timer.seconds;
      
      if (timer.timeRemaining > 0) {
        setInterval(updateClock, 1000);
      } else {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }
    
    updateClock();
  }
  countTimer('1 may 2020');

  // Menu
  const toggleMenu = () =>{
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };
  toggleMenu();

  // popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close'),
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
    popupClose.addEventListener('click', () =>{
      popup.style.display = 'none';
    });
  };
  togglePopUp();
});