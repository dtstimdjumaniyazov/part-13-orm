require('dotenv').config();

const PORT = process.env.PORT || 3001
const DATABASE_URL = process.env.TESTING === 'true'
    ? process.env.TEST_DATABASE_URL
    : (process.env.DATABASE_URL || process.env.TEST_DATABASE_URL)
const SECRET = process.env.SECRET

module.exports = { PORT, DATABASE_URL, SECRET }