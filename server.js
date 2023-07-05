const express = require('express');
const cors = require('cors');
const db = require('./db');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

/*
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
*/

//baixar as dependencias
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const dadosPath = './dados.json';

if (!fs.existsSync(dadosPath)) {
	fs.writeFileSync(dadosPath, '[]', 'utf-8');
}

app.get('/', (req, res) => {
	res.send('Servidor funcionando corretamente!');
});

app.post('/form-data', (req, res) => {

	/*
	const nome = req.body['Nome'];
	const whatssap = req.body['Whatssap'];
	const date = req.body.date;

	console.log(`Dados do formulário recebidos: ${nome}, ${whatssap}, ${date}`);

	const dados = JSON.parse(fs.readFileSync(dadosPath, 'utf-8'));
	dados.push({ nome, whatssap, date });
	fs.writeFileSync(dadosPath, JSON.stringify(dados, null, 2), 'utf-8');

	res.redirect('/sucesso.html');
	*/
	console.log(req.body); // exibe os dados recebidos no console

	const cliente = {
		//nome: req.body.nome,
		nome : req.body['Nome'],
		whatssap : req.body['Whatssap'],
		date : req.body.date
	};

	db.insert(cliente, (err, novoCliente) => {
		if (err) {
			console.error(err);
			res.status(500).send('Erro ao inserir Cliente');
		} else {
			//res.status(201).send(novoCliente);
			res.redirect('/sucesso.html');
		}
		
	});
});

app.get('/sucesso.html', (req, res) => {
	res.sendFile(__dirname + '/sucesso.html');
});

app.get('/calendario.html', (req, res) => {
	res.redirect('http://127.0.0.1:2708/calendario.html');
});

app.get('/agenda', (req, res) => {
	db.find({}, (err, clientes) => {
		if (err) {
			console.error(err);
			res.status(500).send('Erro ao buscar clientes');
		} else {
			res.send(clientes);
		}
	});
});

app.listen(3000, () => {
	console.log('Servidor iniciado na porta 3000');
});
