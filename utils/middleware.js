const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const Blog = require('../models/blog');
const { User, Session } = require('../models');

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        return response.status(400).json({ error: error.errors.map(e => e.message) })
    }

    if (error.name === 'SequelizeForeignKeyConstraintError') {
        return response.status(400).json({ error: 'invalid userId or blogId' })
    }

    next(error)
}

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    if (!req.blog) {
        return res.status(404).end()
    }
    next()
}

const tokenExtractor = async (req, res, next) => {
    const auth = req.get('authorization');
    if (!(auth && auth.toLowerCase().startsWith('bearer'))) {
        return res.status(401).json({ error: 'token is missing'});
    }

    const token = auth.substring(7);

    try {
        req.decodedToken = jwt.verify(token, SECRET);
    } catch {
        return res.status(401).json({ error: 'token invalid'});
    }

    const session = await Session.findOne({ where: { token } });
    if (!session) {
        return res.status(401).json({ error: 'session expired, please login again' });
    }

    const user = await User.findByPk(req.decodedToken.id);
    if (!user || user.disabled) {
        return res.status(401).json({ error: 'account disabled' });
    }

    next();
}

module.exports = {
    errorHandler, blogFinder, tokenExtractor,
};