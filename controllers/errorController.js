const AppError = require('./../utils/appError')

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400)
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]

    const message = `Duplicate field value: ${value}. Please use another value!`
    return new AppError(message, 400)
}

const handleValidationErrorDB = err => {
    let errors = {}
    Object.values(err.errors).forEach(el =>
        errors = { [el.path]:el.message, ...errors}
    )
    return new AppError(err.name, 400, {errorFields: errors})
}

const handleJWTError = () =>
    new AppError('Неверный токен. Попробуйте снова!', 401)

const handleJWTExpiredError = () =>
    new AppError('Срок действия вашего токена истек! Попробуйте войти заново.', 401)

const sendError = (err, req, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        ...err
    })
}

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    let newErr = err

    if (err.name === 'CastError') newErr = handleCastErrorDB(err)
    if (err.code === 11000) newErr = handleDuplicateFieldsDB(err)
    if (err.name === 'ValidationError')
        newErr = handleValidationErrorDB(err)
    if (err.name === 'JsonWebTokenError') newErr = handleJWTError()
    if (err.name === 'TokenExpiredError') newErr = handleJWTExpiredError()

    sendError(newErr, req, res)
}
