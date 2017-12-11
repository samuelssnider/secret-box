var assert  = require('chai').assert;
var app     = require('../server');
var request = require('request')


describe('Server', function() {

  before(function(done) {
    this.port = 9876;
    this.server = app.listen(this.port, function(err, result) {
      if(err) {return done(err); }
      done();
    });
    this.request = request.defaults({baseUrl: 'http://localhost:9876'});
  });
  
  after(function() {
    this.server.close();
  });
  
  it('should exist', function() {
    assert(app);
  });
  
  describe('GET /', function() {
    
    it('should return a 200', function(done) {
      this.request.get('/', function(error, response) {
        if(error) {done(error)}
        assert.equal(response.statusCode, 200);
        done()
      });
    })
    
    it('should have a body with the name of the application', function(done) {
      var title = app.locals.title;

      this.request.get('/', function(error, response) {
        if(error){ done(error) }
        
        assert(response.body.includes(title),
               `"${response.body}" does not include "${title}".`);
               
        done();
      });
    });
    
  });
  
  describe('GET /api/secrets/:id', function() {
    
    it('should return a 404 if the resource is not found', function(done) {
      this.request.get('/api/secrets/bahaha', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })
    
    it('should have the id and message from the resource', function(done) {
      var id = 'wowowow'
      var message = app.locals.secrets['wowowow'];

      this.request.get('/api/secrets/wowowow', function(error, response) {
        if (error) { done(error); }
        assert(response.body.includes(id),
               `"${response.body}" does not include "${id}".`);
        assert(response.body.includes(message),
               `"${response.body}" does not include "${message}".`);
        done();
      });
    });

  })
  
  
  
});