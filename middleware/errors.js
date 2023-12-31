const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    
    if(process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION') {
        let error = {...err}

        error.message = err.message
        // Wrong mongoose Object ID Error
        if(err.name === 'castError') {
            const message = `Resource not found. Invalid: ${err.path} `
            error = new ErrorHandler(message, 400)
        }

        //Handling Mongoose Validation errors
        if(err.name === 'validationError') {
            const message = Object.values(err.errors).map(value => value.message) 
            error = new ErrorHandler(message, 400)
        }

        //Handling the mongoose duplicate key error
        if(err.code === 11000) {
            const message = `Duplicate ${Object.Keys(err.KeyValue) } entered`
            error = new ErrorHandler(message, 400)
        }

        //Handling wrong JWT error
        if(err.name === 'JsonWebTokenError') {
            const message = 'JSON web token is invalid. Try again!!!'
            error = new ErrorHandler(message, 400)
        }

        //Handling Expired JWT error
        if(err.name === 'TokenExpiredError') {
            const message = 'JSON web token is expired. Try again!!!'
            error = new ErrorHandler(message, 400)
        }

        res.status(err.statusCode).json({
            success: false,
            error: err.message || `Internal server error`
        })
    }

    
}