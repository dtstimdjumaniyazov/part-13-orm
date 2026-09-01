const testingRouter = require('express').Router();

const { Blog, User } = require('../models');

testingRouter.post('/reset', async (req, res) => {
    await Blog.truncate({ cascade: true });
    await User.truncate({ cascade: true });
    res.status(204).end();
});

module.exports = testingRouter;
