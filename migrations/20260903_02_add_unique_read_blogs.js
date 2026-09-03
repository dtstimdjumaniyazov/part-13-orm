module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addConstraint('read_blogs', {
            fields: ['user_id', 'blog_id'],
            type: 'unique',
            name: 'unique_user_blog_reading'
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeConstraint('read_blogs', 'unique_user_blog_reading');
    }
};
