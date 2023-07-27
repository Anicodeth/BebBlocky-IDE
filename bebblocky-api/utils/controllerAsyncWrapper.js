module.exports = async (req, res, controller, next) => {
    try {
        return await controller(req, res);
    } catch (error) {
        next(error);
    }
};