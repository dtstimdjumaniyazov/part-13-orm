const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const { User, Blog } = require('../models');

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, name, passwordHash });
    const { passwordHash: _hash, ...userWithoutHash } = user.toJSON();
    res.json(userWithoutHash)
});

usersRouter.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['passwordHash'] },
        include: {
            model: Blog,
            attributes: {
                exclude: ['userId']
            }
        }
    })
    res.json(users)
})

usersRouter.put('/:username', async (req, res) => {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (!user) {
        return res.status(404).end()
    }
    user.name = req.body.name
    await user.save()
    return res.json(user)
})

usersRouter.get('/:id', async (req, res) => {
    const readingListWhere = {};
    if (req.query.read !== undefined) {
        readingListWhere.read = req.query.read === 'true';
    }

    const user = await User.findByPk(req.params.id, {
        attributes: ['name', 'username'],
        include: [
            {
                model: Blog,
                as: 'readings',
                attributes: {exclude: ['createdAt', 'updatedAt', 'userId']},
                through: {
                    attributes: ['read', 'id'],
                    as: 'reading_list', // rename modelName to ex-22 json response
                    where: readingListWhere
                },
            },
        ]
    })

    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

module.exports = usersRouter;