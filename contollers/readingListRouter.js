const readinglistRouter = require('express').Router();

const { User, Blog, ReadBlogs } = require('../models');
const { tokenExtractor } = require('../utils/middleware');

readinglistRouter.post('/', async (req, res) => {
    const { blogId, userId } = req.body;

    if (!Number.isInteger(Number(blogId)) || !Number.isInteger(Number(userId))) {
        return res.status(400).json({ error: 'userId and blogId must be integers' })
    }

    const user = await User.findByPk(userId)
    const blog = await Blog.findByPk(blogId)

    if (!user || !blog) {
        return res.status(404).json({ error: 'invalid userId or blogId' })
    }

    const readings = await ReadBlogs.create({ blogId, userId });
    res.json({
        id: readings.id,
        user_id: readings.userId,
        blog_id: readings.blogId,
        read: readings.read
    })
})

readinglistRouter.put('/:id', tokenExtractor, async (req, res) => {
    const read = await ReadBlogs.findByPk(req.params.id);
    if (!read) return res.status(404).end();
    if (read.userId === req.decodedToken.id) {
        read.read = req.body.read
        await read.save()
        res.json(read)
    } else {
        res.status(401).json({ error: 'only the owner can change status of read'})
    }
});

module.exports = readinglistRouter;
