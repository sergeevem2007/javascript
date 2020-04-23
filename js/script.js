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
          menu = document.querySelector('menu');
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };
    btnMenu.addEventListener('click', handlerMenu);
    menu.addEventListener('click' , (event) =>{
      let target = event.target;
      if (target.tagName === 'A') {
        handlerMenu();
      }
    });
  };
  toggleMenu();

  // popup
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
  togglePopUp();

  // tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
          target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach( (item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  // slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          slider = document.querySelector('.portfolio-content'),
          dots = document.querySelector('.portfolio-dots');
    for (let i = 0; i < slide.length; i++) {
      let li = document.createElement('li');
      li.classList.add('dot');
      dots.append(li);
    }
    const dot = document.querySelectorAll('.dot');
    let currentSlide = 0,
        interval;
    
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };
    const startSlide = (time) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };
    slider.addEventListener('click', (event) =>{
      event.preventDefault();
      let target = event.target;
      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) =>{
          if (elem === target) {
            currentSlide = index;
            console.log(index);
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });
    slider.addEventListener('mouseover', (event) =>{
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) =>{
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')) {
        startSlide(1500);
      }
    });
    startSlide(1500);
  };
  slider();
});