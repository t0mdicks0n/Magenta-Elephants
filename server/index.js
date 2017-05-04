var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../client'));
console.log(__dirname + '/../client');
// app.get('/', function(req, res) {
//   res.send('HELLO!!!');
// });

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
