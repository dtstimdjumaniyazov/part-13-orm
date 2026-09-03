const { sequelize } = require('../utils/db');
const Blog = require('./blog');
const User = require('./user');
const ReadBlogs = require('./read_blogs');
const Session = require('./session');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadBlogs, as: 'readings'});
Blog.belongsToMany(User, { through: ReadBlogs, as: 'readers'});

User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
    Blog, User, ReadBlogs, Session
};