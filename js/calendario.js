// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

	Array.prototype.map = function (callback, thisArg) {

		var T, A, k;

		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}

		//  1. Let O be the result of calling ToObject passing the |this|
		//    value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal
		//    method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callback) is false, throw a TypeError exception.
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let A be a new array created as if by the expression new Array(len)
		//    where Array is the standard built-in constructor with that name and
		//    len is the value of len.
		A = new Array(len);

		// 7. Let k be 0
		k = 0;

		// 8. Repeat, while k < len
		while (k < len) {

			var kValue, mappedValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal
			//    method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal
				//    method of O with argument Pk.
				kValue = O[k];

				// ii. Let mappedValue be the result of calling the Call internal
				//     method of callback with T as the this value and argument
				//     list containing kValue, k, and O.
				mappedValue = callback.call(T, kValue, k, O);

				// iii. Call the DefineOwnProperty internal method of A with arguments
				// Pk, Property Descriptor
				// { Value: mappedValue,
				//   Writable: true,
				//   Enumerable: true,
				//   Configurable: true },
				// and false.

				// In browsers that support Object.defineProperty, use the following:
				// Object.defineProperty(A, k, {
				//   value: mappedValue,
				//   writable: true,
				//   enumerable: true,
				//   configurable: true
				// });

				// For best browser support, use the following:
				A[k] = mappedValue;
			}
			// d. Increase k by 1.
			k++;
		}

		// 9. return A
		return A;
	};
}

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
//let numberDaysMonthUser = numberDaysMonth;//qtnDaysMonth(numberMonth, numberYear); //qtn de dias do mes do usuario
let numberIndexNameWeek = date.getDay();//numero do indice do nome da semana de 0 a 6;

//monthDisplay começa com a data atual
refreshDisplay(numberYear, numberMonth, numberDay);
//................................................................

//gerando as divs iniciais
drawCalendar(numberYear, numberMonth, numberDay);


calendar.addEventListener('click', (ev) => {
	if (ev.target.classList[0] === 'day') {
		const message = document.querySelector('.message');
		message.style.display = 'flex';
		const daySelected = document.querySelector('.day-selected');
		daySelected.innerText = ev.target.innerText;
		paintDaySelected(ev.target);
	} else if (ev.target.classList[0] === 'dayPassMonth') {
		numberMonth -= 1;
		drawCalendar(numberYear, numberMonth, 1)
		refreshDisplay(numberYear, numberMonth, 1)
	} else if (ev.target.classList[0] === 'dayNextMonth') {
		numberMonth += 1;
		drawCalendar(numberYear, numberMonth, 1)
		refreshDisplay(numberYear, numberMonth, 1)
	}
});

btnClosed.addEventListener('click', () => {
	const message = document.querySelector('.message');
	message.style.display = 'none';
});

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
	calendar.innerHTML = '';
}

//desenha as divis do mes passado
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

//desenha as divs do mes 
function drawDivsMonth(year, month) {
	//atualiza o quantidades de dias do mes que está sendo verificado 
	const qtdDays = qtnDaysMonth(month, year);
	createDivDay(qtdDays);
}

//desenha as divs do proximo mes
function drawDivsNextMonth(year, month) {
	const lastDay = lastDayWeekMonth(year, month) + 1;
	for (let d = 1; d <= (7 - lastDay); d++) {
		let day = document.createElement("div");
		day.classList.add("dayNextMonth");
		calendar.appendChild(day);
		day.innerText = d;
	}
}

//colore dia selecionado
function paintDaySelected(el) {
	//verifica qual filho de calendar foi clicado e marcar só ele
	//e quando clicar em outro, o anterior clicado volta ao estado padrão

	const qtdDivs = calendar.children.length
	for (let x = 0; x < qtdDivs; x++) {
		if (calendar.children[x].classList[1] === 'day-clicked' && calendar.children[x].classList[0] === 'day') {
			calendar.children[x].classList.remove('day-clicked')
			console.log(calendar.children[x]);

		}

	}

	el.classList.add('day-clicked')
}


//......................
