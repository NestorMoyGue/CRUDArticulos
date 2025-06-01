export class Errors extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
    }
}


export class NotFoundError extends Errors {
    constructor(message: string) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

export class BadRequestError extends Errors {
    constructor(message: string) {
        super(message, 400);
        this.name = 'BadRequestError';
    }
}