const { sequelize } = require('../utils/db');
const Blog = require('./blog');
const User = require('./user');

User.hasMany(Blog);
Blog.belongsTo(User);

sequelize.sync({ alter: true });

module.exports = {
    Blog, User
};