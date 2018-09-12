const clockface = document.querySelector(".js-time");
const startBtn = document.querySelector(".js-start");
const stopBtn = document.querySelector(".js-reset");
const lapBtn = document.querySelector(".js-take-lap");
const laps = document.querySelector(".js-laps");


const timer = {
  startTime: null,
  deltaTime: null,
  id: null,
  bool: false,
  number: 1,
  startTimer() {
    if(this.bool) return;
    this.bool = true;
    this.startTime = Date.now() - this.deltaTime;
    this.id = setInterval(() => {
      const currentTime = Date.now();
      this.deltaTime = currentTime - this.startTime;
      updateClockface(clockface, this.deltaTime);
    }, 100);
  },
  startClick() {
    if(!this.bool) {
        this.startTimer();
        startBtn.textContent = 'Pause';
    } else {
        this.stopTimer();
        startBtn.textContent = 'Continue';
    }
  },
  stopClick() {
    this.stopTimer();
    this.deltaTime = 0;
    this.number = 1;
    startBtn.textContent = 'start';
    updateClockface(clockface, this.deltaTime);
    laps.innerHTML = '';
  },
  stopTimer() {
    clearInterval(this.id);
    this.bool = false;
  },
  lapClick() {
    const li = document.createElement('li');
    li.textContent = `${this.number++}) ${getFormattedTime(this.deltaTime)}`;
    laps.append(li);
  }
  
};

function getFormattedTime(time) {
	const date = new Date(time);
	let min = date.getMinutes();
	let sec = date.getSeconds();
	let ms = date.getMilliseconds();
	if (min < 10) min = '0' + min;
	if (sec < 10) sec = '0' + sec;
  return `${min}:${sec}.${parseInt(ms / 100)}`
}

function updateClockface(elem, time) {
  elem.textContent = getFormattedTime(time);
}

startBtn.addEventListener('click', timer.startClick.bind(timer));
stopBtn.addEventListener('click', timer.stopClick.bind(timer));
lapBtn.addEventListener('click', timer.lapClick.bind(timer));