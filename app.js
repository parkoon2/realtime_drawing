const express = require('express'), 
      app = express(),
      http = require('http'),
      path = require('path'),
      socket = require('socket.io');

let server = http.createServer(app).listen(7777);
let io = socket.listen(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './public/views');
app.set('view engine', 'ejs');
let line_history = [];

app.get('/', function(req, res) {
    res.render('index', {})
})

io.on('connection', function (socket) {
    console.log(line_history)
    for (let _line of line_history) {
        socket.emit('draw', { line: _line })
    }

    socket.on('draw', function (data) {
        console.log(data)
        line_history.push(data.line);
        io.emit('draw', { line: data.line })
    })
});