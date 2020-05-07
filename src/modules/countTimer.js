const countTimer = (deadline) =>{
  let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds'),
      dateStop = new Date(deadline).getTime();

  const getTimeRemaining = () =>{
    
    let dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000;
        while (timeRemaining <= 0) {
          dateStop += 86400000;
          timeRemaining = (dateStop - dateNow) / 1000;
        }
    let seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
        return {timeRemaining, hours, minutes, seconds};
  }
  const updateClock = () =>{
    let timer = getTimeRemaining();
    timer.hours < 10 ? timerHours.textContent = '0' + timer.hours : timerHours.textContent = timer.hours;
    timer.minutes < 10 ? timerMinutes.textContent = '0' + timer.minutes : timerMinutes.textContent = timer.minutes;
    timer.seconds < 10 ? timerSeconds.textContent = '0' + timer.seconds : timerSeconds.textContent = timer.seconds;
    return timer.timeRemaining;
  }
  if (updateClock() > 0) {
    setInterval(updateClock, 1000);
  }
}

export default countTimer;