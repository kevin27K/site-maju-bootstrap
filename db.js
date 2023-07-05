const Datastore = require('nedb');
const db = new Datastore({ filename: 'produtos.db', autoload: true });

module.exports = db;