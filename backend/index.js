const express = require('express'),
  app = express(),
  cors = require('cors'),
  createError = require('http-errors'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase').then((x) => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
}).catch((err) => {
  console.error('Error connecting to mongo', err.reason);
});

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// API & Swagger
app.use('/api', require('./routes'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Port Creation
app.listen(4000, () => {
  console.log('Connected to port 4000');
});

// Error Handler
app.use((req, res, next) => { next(createError(404)); });
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
