var socket = io.connect();

socket.on('new message', function(data) {
  var body = document.getElementById('app')
  body.append(`<div><strong>${data.user}</strong>${data.msg}</div>`);
});

var createUser = function(user) {
  socket.emit('new user', user, () => {});
};

createUser(String(Math.random()));

setInterval(function() {
  socket.emit('send message', 'hey');
}, 2000);
