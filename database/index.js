var mysql = require('mysql');

module.exports = mysql.createConnection({
	user: 'root',
	password: 'plantlife',
	database: '4um'
});