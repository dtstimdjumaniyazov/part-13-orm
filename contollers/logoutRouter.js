const logoutRouter = require('express').Router();

const { Session } = require('../models');
const { tokenExtractor } = require('../utils/middleware');

logoutRouter.delete('/', tokenExtractor, async (req, res) => {
    const token = req.get('authorization').substring(7);
    await Session.destroy({ where: { token } });
    res.status(204).end();
});

module.exports = logoutRouter;
