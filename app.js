const express = require('express');
const middleware = require('./utils/middleware');
const app = express();

const blogsRouter = require('./contollers/blogsRouter');
const usersRouter = require('./contollers/usersRouter');
const loginRouter = require('./contollers/login');
const authorsRouter = require('./contollers/authorsRouter');
const testingRouter = require('./contollers/testingRouter');

app.use(express.json());

app.get('/', (_req, res) => {
    res.status(200).end();
});

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorsRouter);
app.use('/api', testingRouter);

app.use(middleware.errorHandler);

module.exports = app;