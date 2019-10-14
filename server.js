const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dburl = require('./server/config/database');

// Connect to the db
mongoose.connect(dburl.url);

var morgan = require('morgan');

app.use(express.static(path.join(__dirname, 'dist/Front')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(morgan('dev'));

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function (req, res) {
  res.send('Relax. We will put the home page here later.');
});

const router = express.Router();

require('./server/route/forum.route')(router);

//set login page routes to the app  -> CECI A ETE MODIFIER
app.use('/', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/Front/index.html'));
});

var server = app.listen(process.env.PORT || 3003, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
