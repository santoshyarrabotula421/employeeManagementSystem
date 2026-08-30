const errorMiddleware = (err, req, res, next) => {

    console.error(err);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Validation failed"
        });
    }

    // Invalid ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    // Duplicate key
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate value"
        });
    }

    // Unknown error
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

export default errorMiddleware;

