'use strict';


let timeOfDay = document.querySelector('.time-of-day'),
    day = document.querySelector('.day'),
    time = document.querySelector('.time'),
    count = document.querySelector('.count');

let newDate = new Date();

const getTimeOfDay = function(){
  let hours = newDate.getHours();
  if (hours >= 0 && hours < 6) {
    timeOfDay.textContent = 'Доброй ночи';
  } else if (hours > 5 && hours < 11) {
    timeOfDay.textContent = 'Доброе утро';
  } else if (hours > 18 && hours < 24) {
    timeOfDay.textContent = 'Добрый вечер';
  } else {
    timeOfDay.textContent = 'Добрый день';
  }
}
getTimeOfDay();

const getDay = function(){
  let dayOfWeek = newDate.getDay();
  let week = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  day.textContent = week[dayOfWeek];
}
getDay();

const getTime = function(){
  let newDate = new Date();
  time.textContent = newDate.toLocaleTimeString('en');
  setInterval(getTime, 1000);
}


getTime();

const getCount = function(){
  let newYear = new Date('Jan 1 2021'),
      msPerDay = 24*60*60*1000,
      daysLeft = Math.round((newYear.getTime() - newDate.getTime())/msPerDay);
  count.textContent = daysLeft;
}
getCount();