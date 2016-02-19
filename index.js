var express = require('express');
var app = express();

var fs = require('fs')
var _ = require('lodash')
var engines = require('consolidate')

var users = []

fs.readFile('users.json', {encoding: 'utf8'}, function(err, data) {
  if (err) throw err

  JSON.parse(data).forEach(function (user) {
    var username = user.email.split('@')[0]
    user.username = username
    users.push(user)
  })
})

app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/profilepics', express.static('images'))

app.get('/', function (req, res) {
  res.render('index', {users: users})
})

app.get('/', function (req, res) {
  var buffer = ''

  users.forEach(function (user) {
    buffer += '<a href="/' + user.email.split('@')[0] + '">' + user.name + '<br>'
  })
  res.send(users);
});

app.get(/kirk.*/, function(req, res, next) {
  console.log('KIRK USER ACCESS')
  next()
})

app.get('/:username', function(req, res) {
  var username = req.params.username
  var user = getUser(username)
  res.render('user', {
    user: user,
    address: user.address
  })
})

var server = app.listen(8080, function () {
  console.log('Server running at http://localhost:' + server.address().port);
});



function getUser() {
  console.log('inside get USER')
}
