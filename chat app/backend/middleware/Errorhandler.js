const {constants} =require('../constants');
const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                ttile: "validation failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.UNAUTHORIZED_ERROR:
            res.json({
                title: "unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.FORBIDEN:
            res.json({
                title: "forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.NOT_FOUND_ERROR:
            res.json({
                title: "resource not found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.INTERNAL_SERVER_ERROR:
            res.json({
                title: "server error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        default:
            console.log("no error found")
            break;
    }
};

module.exports = errorhandler;
