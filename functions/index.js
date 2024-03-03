const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");

//express package
const express = require('express');
//middleware package
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(cors());
app.use('/api', api);
// parse application/x-www-form-urlencoded

app.use(function (req, res, next) {
  //set headers to allow cross origin request.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api', function (req, res) {
  res.end('file catcher examplehh');
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);
console.log('server running on port', 5000);