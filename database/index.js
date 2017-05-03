var mysql = require('mysql');

module.exports = mysql.createConnection({
	user: 'root',
	password: '',
	database: '4um'
});