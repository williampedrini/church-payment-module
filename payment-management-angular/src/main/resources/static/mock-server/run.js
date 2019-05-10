/* set up */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

/* configuration */
const app = express();
app.use(express.static(path.join(__dirname, '..')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

/* listen (start app with node server.js) */
app.listen(8080);
console.log("App listening on port 8080");