/* 
  Напишите скрипт, реализующий базовый функционал
  таймера, запуск отсчета времени и сброс счетчика
  в исходное состояние.
  
  Создайте функцию startTimer, которая будет запускать
  отсчет времени с момента ее нажатия, она вызывается 
  при клике на кнопку с классом js-timer-start.
  
  Создайте функцию stopTimer, которая будет останавливать
  счетчик, она вызывается при клике на кнопку с классом js-timer-stop.
  
  Используйте вспомогательную функцию updateClockface 
  которая обновляет значение счетчика в интерфейсе. 
  Для составления строки времени в формате xx:xx.x, 
  исользуйте функцию getFormattedTime из задания номер 1.
  
  Подсказка: так как нам интересны исключительно сотни миллисекунд,
      нет смысла выполнять пересчет времени чаще чем каждые 100мс.
*/

const clockface = document.querySelector(".js-clockface");
const lapBtn = document.querySelector(".js-timer-lap");
const resetBtn = document.querySelector(".js-timer-reset");
const startBtn = document.querySelector(".js-timer-start");
const lap = document.querySelector('.js-laps');

const timer = {
	startTime: null,
	onPauseTime: 0,
	onPause: true,
	id: null,

	start() {
		this.onPause = false;


		// console.log(this.id);
		if (this.id) { return };

		startBtn.textContent = 'Pause';
		this.startTime = Date.now();
		this.id = setInterval(() => {
			const currentTime = Date.now();
			const deltaTime = currentTime - this.startTime + this.onPauseTime;
			formatTime(deltaTime);
			// this.onPauseTime = formatTime(deltaTime);
		}, 100);
		// console.log(this.onPauseTime);
		// } else if (this.id) {
		// 	clockface.textContent = this.onPauseTime;

		// 	console.log(this.onPauseTime);

	},

	pause() {
		this.onPause = true;
		startBtn.textContent = 'Continue';
		this.onPauseTime = Date.now() - this.startTime + this.onPauseTime;
		clearInterval(this.id);
		this.id = null;
		// console.log(this.onPauseTime);
	},
	reset() {
		this.onPause = true;
		clockface.textContent = '00:00.0';
		clearInterval(this.id);
		startBtn.textContent = 'Start';
		this.id = null;
	}
};

startBtn.addEventListener('click', timer.start.bind(timer));
// stopBtn.addEventListener('click', timer.stop.bind(timer));
resetBtn.addEventListener('click', timer.reset.bind(timer));

/*
* Вспомогательные функции
*/

/*
* Обновляет поле счетчика новым значением при вызове
* аргумент time это кол-во миллисекунд
*/
// function updateClockface(time) {
//   // Используйте функцию getFormattedTime из задания #1
//   // elem.textContent = getFormattedTime(time);
//   clockface.textContent = time;
// }
function formatTime(ms) {
	const date = new Date(ms);
	let min = date.getMinutes();
	let sec = date.getSeconds();
	let ms = date.getMilliseconds();
	if (min < 10) min = '0' + min;
	if (sec < 10) sec = '0' + sec;
	// if (msec < 10) msec = '0' + msec;
	clockface.textContent = `${min}:${sec}.${parseInt(ms / 100)}`
}

/*
* Подсветка активной кнопки
*/
function setActiveBtn(target) {
	if (target.classList.contains('active')) {
		return;
	}

	startBtn.classList.remove('active');
	stopBtn.classList.remove('active');

	target.classList.add('active');
}
