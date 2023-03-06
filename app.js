const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');
const routes = require('./routes');
const { limiter } = require('./middlewares/limiter');

const { connect } = require('./config');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.use(routes);

mongoose.set('strictQuery', false);

connect(app);

app.use(errorLogger);
app.use(limiter);
app.use(errors());
app.use(errorsHandler);
