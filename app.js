const express = require('express');
const cors = require('cors');
const Home = require('./src/api/Home.controller')
const validationRule = require('./src/middlewares/validation.middleware')
// const { errorResponse } = require('./utils/responses');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    const errorMessage = {
      status: 'error',
      message: 'Invalid JSON payload passed.',
      data: null,
    };
    return res.status(400).send(errorMessage);
  }
  return next();
});


app.get('/', Home.homeHandler) ; // Add first handler 

app.post('/validate-rule', validationRule, Home.validateHandler)

// 404 Error Handler
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  return res.status(404).send({
    status: 'error',
    message: 'Route not found.',
    data: null,
  })
})


// errorResponse(res, 404, 'Invalid Route.'));


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  return res.status(500).send({
    status: 'error',
    message: 'Internal server error.',
    data: null,
  })
});

const server = app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));