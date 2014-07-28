
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var map = require('./routes/map');
var offer = require('./routes/offer');
var user = require('./routes/user');
var fav = require('./routes/fav');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
app.use(express.favicon());
// app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/test', routes.test);
app.get('/profile', routes.profile);


app.get('/map', map.get);
app.get('/offer', offer.get);
app.get('/fav', fav.get);
app.get('/user', user.get);
app.post('/user', user.post);
app.put('/user', user.put);
app.delete('/user', user.delete);

app.get('/exMap', routes.exMap);
app.get('/exFav', routes.exFav);
app.get('/exPr', routes.exPr);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

