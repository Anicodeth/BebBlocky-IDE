const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const ForbiddenError = require('../errors/ForbiddenError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

module.exports = (err, req, res, next) => {
    if (err instanceof BadRequestError) {
        return res.status(400).json({ message: err.message });
    } else if (err instanceof InternalServerError) {
        return res.status(500).json({ message: err.message });
    } else if (err instanceof ForbiddenError) {
        return res.status(403).json({ message: err.message });
    } else if (err instanceof UnauthorizedError) {
        return res.status(401).json({ message: err.message });
    } else if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
    } else {
        return res.status(500).json({ message: err.message });
    }
}

