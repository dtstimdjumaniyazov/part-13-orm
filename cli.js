const { QueryTypes } = require('sequelize');
const { sequelize } = require('./utils/db');

const main = async () => {
    try {
        await sequelize.authenticate();
        const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT});
        console.log(blogs);
    } catch (error) {
        console.error(error);
    }
}

main();