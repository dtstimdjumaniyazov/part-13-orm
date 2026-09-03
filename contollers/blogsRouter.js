const { Op } = require('sequelize');

const Blog = require('../models/blog');
const { User } = require('../models');
const blogsRouter = require('express').Router();
const { blogFinder, tokenExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
    const where = {};
    if (req.query.search) {
        where[Op.or] = [
            { title: { [Op.iLike]: `%${req.query.search}%` } },
            { author: { [Op.iLike]: `%${req.query.search}%` } }
        ]
    }
    const blogs = await Blog.findAll({
        include: {
            model: User,
            attributes: ['id', 'username']
        },
        where,
        order: ['likes']
    });
    res.json(blogs);
});

blogsRouter.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({ ...req.body, userId: user.id });
        res.json(blog);
    } catch (error) {
        next(error);
    }
});

blogsRouter.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
    if (req.blog.userId !== req.decodedToken.id) {
        return res.status(403).json({ error: 'the user who added the blog can delete'})
    }
    await req.blog.destroy();
    res.status(204).end();
})

blogsRouter.put('/:id', blogFinder, async(req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
})

module.exports = blogsRouter;