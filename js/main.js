const stopwatch = document.getElementById('stopwatch'); //para que funcione los números
const playPauseButton = document.getElementById('play-pause'); //para que funcione la pausa
const secondsSphere = document.getElementById('seconds-sphere'); //movimiento de la bolita

let stopwatchInterval = ''; //variable para guardar los intervalos
let runningTime = 0; //controlar el time que transcurrio

//funciones
const playPause = () => { //va funcionar cada vez que se de click en play
	const isPaused = !playPauseButton.classList.contains('running'); //esto pregunta si la clase playPauseButton tiene la clase contains 'running' es porque estan funcionando.
	if (isPaused) { //pregunta si esta pausado...
		playPauseButton.classList.add('running');
		start(); //entonces dale a start para comenzar "llama a la funcion start"
	} else { //pregunta si esta play
		playPauseButton.classList.remove('running');
		pause(); //entonces dale a pause para frenar "remueve la clase running llamando a la funcion"
	}
}

const pause = () => {
	secondsSphere.style.animationPlayState = 'paused'; //cambia la animación de la bolilla a pausa.
	clearInterval(stopwatchInterval); //detiene el intervalo del reloj
}

const stop = () => {
	secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)'; //recetea la bolilla a su posición original
	secondsSphere.style.animation = 'none'; //elimina la animación
	playPauseButton.classList.remove('running'); //elimina el running para volver a colocar el play y no el de pausa.
	runningTime = 0; //recetea el tiempo a cero.
	clearInterval(stopwatchInterval); //recetea el intervalo.
	stopwatch.textContent = '00:00'; // vuelve a colocar el tiempo en 00:00.
}

const start = () => {
	secondsSphere.style.animation = 'rotacion 60s linear infinite'; //cuando comieza, selecciona a la bolita y le da estilo.
	let startTime = Date.now() - runningTime; //para darle un tiempo de inicio.
	secondsSphere.style.animationPlayState = 'running'; //sobreescribe el pausado puesto en el css.

	stopwatchInterval = setInterval( () => {
	//creamos la funcion 'setInterval' para que cada 1000s se actualice el cronometro y se guarde en stopwatchInterval.
	runningTime = Date.now() - startTime; //calcular cuanto tiempo paso
	stopwatch.textContent = calculateTime(runningTime); //cambia los números de reloj cada vez que se actuliza, osea con lo que nos devuelve calculateTime.
	}, 1000)
}
const calculateTime = runningTime => {
	const total_seconds = Math.floor(runningTime / 1000); //calcula los segundos totales
	const total_minutes = Math.floor(total_seconds / 60); //calcula los minutos totales

	//le colocamos un modulo '%' para que cuando llegue a 60s vuelva a cero y un padStart (2, "0") para que siempre tenga dos digitos el reloj
	const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
	//a los minutos no le colocamos modulo porque son infinitos pero si un padStart 
	const display_minutes = total_minutes.toString().padStart(2, "0");

	return `${display_minutes}:${display_seconds}` //retorna a calculateTime(runningTime) para que actualice
}