var express = require('express')
var app = express()

app.set('port', process.env.PORT || 3000)
app.locals.title = "Secret Box"
app.locals.secrets = {
  wowowow: 'I am a banana'
}

app.get('/', function(request, response) {
  response.send(app.locals.title);
});

app.get('/api/secrets/:id', function(request, response) {
  var id = request.params.id
  var message = app.locals.secrets[id]

  if (!message) { return response.sendStatus(404)  }

  response.json({ id, message })
})
  

if(!module.parent){
  app.listen('port', function() {
    console.log(`${app.locals.title} is running on port ${app.get('port')}`)
  })
}

module.exports = app