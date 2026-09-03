const testingRouter = require('express').Router();

const { Blog, User, ReadBlogs, Session } = require('../models');

testingRouter.post('/reset', async (req, res) => {
    await Session.truncate({ cascade: true });
    await ReadBlogs.truncate({ cascade: true });
    await Blog.truncate({ cascade: true });
    await User.truncate({ cascade: true });
    res.status(204).end();
});

module.exports = testingRouter;
