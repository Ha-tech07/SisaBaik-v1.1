export function tanganiError(error, req, res, next) {
    if(res.headersSent) return next(error);

    const status = Number.isInteger(error.status) ? error.status:500;
    res.status(status).json({
        success: false,
        error: {
            code: error.code || "INTERNAL_SERVER_ERROR",
            message: status === 500 ? "Terjadi keslahan pada server." :error.message
        }
    });
}