const listaClientes = [];
const listaClientesHoje = []

const data = new Date();
const mes = data.getMonth() + 1;
const dia = data.getDate();
const ano = data.getFullYear();

async function requireClientes() {
	try {
		const response = await fetch('http://localhost:3000/agenda');
		const clientes = await response.json();
		pegaClientes(clientes);
	} catch (error) {
		console.error(error);
	}
}

function pegaClientes(clientes) {
	for (let x = 0; x < clientes.length; x++) {
		listaClientes.push(clientes[x]);
	}
}

async function main() {
	await requireClientes();
}

function agendaHoje() {
	const dataAtual = `${ano}-${mes}-${dia}`
	const data = trataData(dataAtual);

	listaClientes.forEach(cliente => {
		if (data === cliente.date) {
			listaClientesHoje.push(cliente)
		}	
	})
}

function trataData(data) {
	const primeiroHifem = data.indexOf('-')//posição 1º hifem

	const pegaMesDia = data.slice(primeiroHifem + 1)//separa o string gurandando a partir do 1º hifem até o final

	const segundoHifem = pegaMesDia.indexOf('-')//posição 2º hifem

	const trataAno = data.slice(0, 4);

	//console.log(pegaMesDia.length) //tamanho max vai sempre ser 5 já que exclui o primeiro hifem
	let separaMes
	let separaDia
	let novaData
	if (pegaMesDia.length < 5) {
		if (segundoHifem < 2) {
			separaMes = pegaMesDia.slice(0, segundoHifem)
			separaMes = `0${separaMes}`
		} else {
			separaMes = pegaMesDia.slice(0, segundoHifem)
		}

		separaDia = pegaMesDia.slice(segundoHifem + 1)

		if (Number(separaDia < 10)) {
			separaDia = `0${separaDia}`
		}

		novaData = `${trataAno}-${separaMes}-${separaDia}`
		return novaData

	}
}

main();

document.querySelector('#agenda-hoje').addEventListener('click', () => {
	agendaHoje()
	document.querySelector('.transicao-menu').style.display = 'flex'
})

//<li class="cliente"><a href="" class="link-cliente">cscsdsdsdsdsdsdsd</a></li>
