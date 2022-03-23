class AppError extends Error {
    constructor(message, statusCode, ...optionalValues) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        optionalValues.forEach(value => {
            if(typeof value==='object')
            Object.entries(value).forEach(([key, value]) =>{
                console.log(key, value)
                this[key] = value
            })
        })

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError

