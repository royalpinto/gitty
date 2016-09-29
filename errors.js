'use strict';


class AppError extends Error {

    constructor(message, status) {
        super(message);
        this.status = status;
    }

    toJSON() {
        return {
            message: this.message,
        };
    }

}


class NotFound extends AppError {

    constructor(message, status) {
        super(message, 404);
    }

}


const handle = (req, res, error) => {
    console.error(error.toString());
    if (error instanceof AppError) {
        res.status(error.status).json(error);
    } else {
        res.status(500).end('Internal Server Error');
    }
};


module.exports = {
    AppError: AppError,
    NotFound: NotFound,
    handle: handle,
};
