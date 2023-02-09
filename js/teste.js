//const calendar = document.querySelector(".container-calendar");
const proximo = document.querySelector('#nextButton');
const voltar = document.querySelector('#backButton');
//...............................
const btnClosed = document.querySelector('.btn-closed');

//nomes dos dias dos meses
const namesMonth = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', "Outubro", "Novembro", "Dezembro"];

//nomes dos dias da semana
const namesWeek = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

//const firstWeek = [];

//data do sistema
const date = new Date();
const todayCurrent = date.getUTCDate();//dia atual
const yearCurrent = date.getFullYear();//ano atual
const monthCurrent = date.getMonth(); //mes atual (conta os meses de 0 ate 11);

//quantidade de dias do mes atual
let numberDaysMonth = qtnDaysMonth(monthCurrent, yearCurrent);

//data do usuario
let numberDay = todayCurrent;
let numberMonth = monthCurrent;
let numberYear = yearCurrent;
//let numberDaysMonthUser = numberDaysMonth;//qtnDaysMonth(numberMonth, numberYear); //qtn de dias do mes do usuario
let numberIndexNameWeek = date.getDay();//numero do indice do nome da semana de 0 a 6;

//monthDisplay começa com a data atual
refreshDisplay(numberYear, numberMonth, numberDay);
//................................................................

//gerando as divs iniciais
drawCalendar();

proximo.addEventListener("click", function () {
	numberDay = 1;
	if (numberMonth >= 0 && numberMonth < 11) {
		numberMonth++;
	} else if (numberMonth === 11) {
		numberMonth = 0;
		numberYear++;
	}

	//atualiza o display
	refreshDisplay(numberYear, numberMonth, numberDay);

	//atualizando as divs days
	drawCalendar(numberYear, numberMonth, numberDay);
})

voltar.addEventListener("click", function () {
	numberDay = 1;
	if (numberMonth <= 11 && numberMonth > 0) {
		numberMonth--;
	} else if (numberMonth === 0) {
		numberMonth = 11;
		numberYear--;
	}
	//atualiza o display
	refreshDisplay(numberYear, numberMonth, numberDay);

	//atualizando as divs days
	drawCalendar(numberYear, numberMonth, numberDay);
});


//funções -----------------------------------------------

//atualiza o displayMonth
function refreshDisplay(year, month, day) {
	const newDate = new Date(year, month, day);
	const monthDisplay = document.querySelector('#monthDisplay');
	monthDisplay.innerText = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} - ${namesMonth[newDate.getMonth()]}`;
}

//desenha calendario
function drawCalendar(year, month, day) {
	clearCalendar();
	drawDivsPassMonth(year, month, day);
	drawDivsMonth(year, month)
	drawDivsNextMonth(year, month);
}

//cria as divs dinamicamente com base na quantidade de dias do mes
function createDivDay(qtd) {
	for (let d = 1; d <= qtd; d++) {
		let day = document.createElement("div");
		day.classList.add("day");
		calendar.appendChild(day);
		day.innerText = d;
	}
}

//cria as divs dinamicamente com base na quantidade de dias do mes passado
function createDivPassMonth(inicial, qtd) {
	for (let d = ((inicial + 1) - qtd); d <= inicial; d++) {
		let day = document.createElement("div");
		day.classList.add("dayPassMonth");
		calendar.appendChild(day);
		day.innerText = d;
	}
}

//cria as divs dinamicamente com base na quantidade de dias do proximo mes
function createDivNextMonth() {
	const lastDay = lastDayWeekMonth(numberYear, numberMonth);
	for (let d = 1; d < lastDay + 1; d++) {
		let divDay = document.createElement("div");
		day.classList.add("dayPassMonth");
		calendar.appendChild(divDay);
		divDay.innerText = d;
	}
}

//verifica se o ano é bissexto
function isLeapYear(fyear) {
	if (fyear % 4 === 0) {
		if (fyear % 100 !== 0) {
			return true;
		} else if (fyear % 100 === 0) {
			if (fyear % 400 === 0) {
				return true
			} else {
				return false;
			}
		}
	} else {
		return false;
	}

}

//retorna quantos dias tem o mes de tal ano
function qtnDaysMonth(fmonth, fyear) {
	let fdate = new Date(fyear, fmonth, 1);
	let days = [];

	while (fdate.getMonth() === fmonth) {
		days.push(fdate.getDate());
		fdate.setDate(fdate.getDate() + 1);
	}
	return days.length;
}

//pega o nome do dia da semana que começa o mes
function getFirstNameWeek(fyear, fmonth) {
	let initialDate = new Date(`${fyear}-${fmonth + 1}-1`);
	return namesWeek[initialDate.getDay()];
}

//pega o numero do dia da semana que começa o mes
function getFirstNumberWeek(fyear, fmonth) {
	let initialDate = new Date(`${fyear}-${fmonth + 1}-1`);
	return initialDate.getDay();
}

//retorna o indice do ultimo dia da semana do mes
function lastDayWeekMonth(fyear, fmonth) {
	const lastDay = qtnDaysMonth(fmonth, fyear);
	const date = new Date(fyear, fmonth, lastDay);
	return date.getDay();

}

//retorna ultimo dia do mes
function lastDayMonth(fyear, fmonth) {
	const lastDay = qtnDaysMonth(fmonth, fyear);
	const date = new Date(fyear, fmonth, lastDay);
	return date.getDate();
}

//................................

//limpa o calendar
function clearCalendar() {
	const calendar = document.querySelector(".container-calendar");
	calendar.innerHTML = '';
}

function drawDivsPassMonth(year, month, day) {
	let days = qtnDaysMonth(month - 1, year); //quantidade de dias do mes anterior(month-1)
	let indexWeek = getFirstNumberWeek(year, month);//posição inicial na semana(para fazer a conta de quantas divs fazer do mes passado)

	//se o mes for janeiro arruma a div para dezembro do ano passado
	if (month === 0) {
		days = qtnDaysMonth(11, year - 1);
		createDivPassMonth(days, indexWeek);
	} else {
		createDivPassMonth(days, indexWeek);
	}
}

function drawDivsMonth(year, month) {
	//atualiza o quantidades de dias do mes que está sendo verificado 
	const qtdDays = qtnDaysMonth(month, year);
	createDivDay(qtdDays);
}

function drawDivsNextMonth(year, month) {
	const lastDay = lastDayWeekMonth(year, month) + 1;
	for (let d = 0; d <= (6 - lastDay); d++) {
		let day = document.createElement("div");
		day.classList.add("dayPassMonth");
		calendar.appendChild(day);
		day.innerText = d + 1;
	}
}

//......................

calendar.addEventListener('click', (ev) => {
	/*const message = document.querySelector('.message');
	message.style.display = 'flex';
	const daySelected = document.querySelector('.day-selected');
	daySelected.innerText = ev.target.innerText;
	*/
	if (ev.target.classList[0] === 'day') {
		const message = document.querySelector('.message');
		message.style.display = 'flex';
		const daySelected = document.querySelector('.day-selected');
		daySelected.innerText = ev.target.innerText;
	} else if (ev.target.classList[0] === 'dayPassMonth') {
		//fazer uma function que desenha o calendario de acordo com a data passada por parametro
		//createCalendar(numberYear, numberMonth, numberDay)
	}
});

btnClosed.addEventListener('click', () => {
	const message = document.querySelector('.message');
	message.style.display = 'none';
});


function createCalendar(year, month, day) {
	const newDate = new Date(year, month, day);
	monthDisplay.innerText = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} - ${namesMonth[newDate.getMonth()]}`;
}


/*
const calendar = document.querySelector(".container-calendar");
const proximo = document.querySelector('#nextButton');
const voltar = document.querySelector('#backButton');
//...............................
const btnClosed = document.querySelector('.btn-closed');

//nomes dos dias dos meses
const namesMonth = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', "Outubro", "Novembro", "Dezembro"];

//nomes dos dias da semana
const namesWeek = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

//const firstWeek = [];

//data do sistema
const date = new Date();
const todayCurrent = date.getUTCDate();//dia atual
const yearCurrent = date.getFullYear();//ano atual
const monthCurrent = date.getMonth(); //mes atual (conta os meses de 0 ate 11);

//quantidade de dias do mes atual
let numberDaysMonth = qtnDaysMonth(monthCurrent, yearCurrent);

//data do usuario
let numberDay = todayCurrent;
let numberMonth = monthCurrent;
let numberYear = yearCurrent;
let numberDaysMonthUser = numberDaysMonth;//qtnDaysMonth(numberMonth, numberYear); //qtn de dias do mes do usuario
let numberIndexNameWeek = date.getDay();//numero do indice do nome da semana de 0 a 6;

//monthDisplay começa com a data atual
refreshDisplay(numberYear, numberMonth, numberDay);
//................................................................

//gerando as divs iniciais
drawCalendar();

proximo.addEventListener("click", function () {
	numberDay = 1;
	if (numberMonth >= 0 && numberMonth < 11) {
		numberMonth++;
	} else if (numberMonth === 11) {
		numberMonth = 0;
		numberYear++;
	}

	//atualiza o display
	refreshDisplay(numberYear, numberMonth, numberDay);

	//atualizando as divs days
	drawCalendar();
})

voltar.addEventListener("click", function () {
	numberDay = 1;
	if (numberMonth <= 11 && numberMonth > 0) {
		numberMonth--;
	} else if (numberMonth === 0) {
		numberMonth = 11;
		numberYear--;
	}
	//atualiza o display
	refreshDisplay(numberYear, numberMonth, numberDay);

	//atualizando as divs days
	drawCalendar()
});


//funções -----------------------------------------------

//atualiza o displayMonth
function refreshDisplay(year, month, day) {
	const newDate = new Date(year, month, day);
	const monthDisplay = document.querySelector('#monthDisplay');
	monthDisplay.innerText = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} - ${namesMonth[newDate.getMonth()]}`;
}

//desenha calendario
function drawCalendar() {
	clearCalendar();
	drawDivsPassMonth();
	drawDivsMonth()
	drawDivsNextMonth();
}

//cria as divs dinamicamente com base na quantidade de dias do mes
function createDivDay(qtd) {
	for (let d = 1; d <= qtd; d++) {
		let day = document.createElement("div");
		day.classList.add("day");
		calendar.appendChild(day);
		day.innerText = d;
	}
}

//cria as divs dinamicamente com base na quantidade de dias do mes passado
function createDivPassMonth(inicial, qtd) {
	for (let d = ((inicial + 1) - qtd); d <= inicial; d++) {
		let day = document.createElement("div");
		day.classList.add("dayPassMonth");
		calendar.appendChild(day);
		day.innerText = d;
	}
}

//cria as divs dinamicamente com base na quantidade de dias do proximo mes
function createDivNextMonth() {
	const lastDay = lastDayWeekMonth(numberYear, numberMonth);
	for (let d = 1; d < lastDay + 1; d++) {
		let divDay = document.createElement("div");
		day.classList.add("dayPassMonth");
		calendar.appendChild(divDay);
		divDay.innerText = d;
	}
}

//verifica se o ano é bissexto
function isLeapYear(fyear) {
	if (fyear % 4 === 0) {
		if (fyear % 100 !== 0) {
			return true;
		} else if (fyear % 100 === 0) {
			if (fyear % 400 === 0) {
				return true
			} else {
				return false;
			}
		}
	} else {
		return false;
	}

}

//retorna quantos dias tem o mes de tal ano
function qtnDaysMonth(fmonth, fyear) {
	let fdate = new Date(fyear, fmonth, 1);
	let days = [];

	while (fdate.getMonth() === fmonth) {
		days.push(fdate.getDate());
		fdate.setDate(fdate.getDate() + 1);
	}
	return days.length;
}

//pega o nome do dia da semana que começa o mes
function getFirstNameWeek(fyear, fmonth) {
	let initialDate = new Date(`${fyear}-${fmonth + 1}-1`);
	return namesWeek[initialDate.getDay()];
}

//pega o numero do dia da semana que começa o mes
function getFirstNumberWeek(fyear, fmonth) {
	let initialDate = new Date(`${fyear}-${fmonth + 1}-1`);
	return initialDate.getDay();
}

//retorna o indice do ultimo dia da semana do mes
function lastDayWeekMonth(fyear, fmonth) {
	const lastDay = qtnDaysMonth(fmonth, fyear);
	const date = new Date(fyear, fmonth, lastDay);
	return date.getDay();

}

//retorna ultimo dia do mes
function lastDayMonth(fyear, fmonth) {
	const lastDay = qtnDaysMonth(fmonth, fyear);
	const date = new Date(fyear, fmonth, lastDay);
	return date.getDate();
}

//................................

//limpa o calendar
function clearCalendar() {
	calendar.innerHTML = '';
}

function drawDivsPassMonth() {
	let month = numberMonth;//mes consultado
	let year = numberYear;//ano do mes consultado
	let days = qtnDaysMonth(month - 1, year); //quantidade de dias do mes anterior(month-1)
	let indexWeek = getFirstNumberWeek(year, month);//posição inicial na semana(para fazer a conta de quantas divs fazer do mes passado)

	//se o mes for janeiro arruma a div para dezembro do ano passado
	if (month === 0) {
		days = qtnDaysMonth(11, year - 1);
		createDivPassMonth(days, indexWeek);
	} else {
		createDivPassMonth(days, indexWeek);
	}
}

function drawDivsMonth() {
	//atualiza o quantidades de dias do mes que está sendo verificado
	numberDaysMonthUser = qtnDaysMonth(numberMonth, numberYear);
	createDivDay(numberDaysMonthUser);
}

function drawDivsNextMonth() {
	const lastDay = lastDayWeekMonth(numberYear, numberMonth) + 1;
	for (let d = 0; d <= (6 - lastDay); d++) {
		let day = document.createElement("div");
		day.classList.add("dayPassMonth");
		calendar.appendChild(day);
		day.innerText = d + 1;
	}
}

//......................

calendar.addEventListener('click', (ev) => {
	/*const message = document.querySelector('.message');
	message.style.display = 'flex';
	const daySelected = document.querySelector('.day-selected');
	daySelected.innerText = ev.target.innerText;
	
if (ev.target.classList[0] === 'day') {
	const message = document.querySelector('.message');
	message.style.display = 'flex';
	const daySelected = document.querySelector('.day-selected');
	daySelected.innerText = ev.target.innerText;
} else if (ev.target.classList[0] === 'dayPassMonth') {
	//fazer uma function que desenha o calendario de acordo com a data passada por parametro
	createCalendar(numberYear, numberMonth, numberDay)
}
});

btnClosed.addEventListener('click', () => {
	const message = document.querySelector('.message');
	message.style.display = 'none';
});


function createCalendar(year, month, day) {
	const newDate = new Date(year, month, day);
	monthDisplay.innerText = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} - ${namesMonth[newDate.getMonth()]}`;
}

*/