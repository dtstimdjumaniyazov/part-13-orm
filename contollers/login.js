const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();

const { SECRET } = require('../utils/config');
const { User, Session } = require('../models');

loginRouter.post('/', async (req, res) => {
    const body = req.body;

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    if (user.disabled) {
        return res.status(401).json({
            error: 'account disabled'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

    await Session.create({ userId: user.id, token })

    res.status(200).json({ token, username: user.username, name: user.name})
})

module.exports = loginRouter;