const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        return response.status(400).json({ error: error.errors.map(e => e.message) })
    }

    next(error)
}

module.exports = {
    errorHandler
};