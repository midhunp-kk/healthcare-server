import { CustomError } from '@/src/utils/errors/custom.errors'
import { HttpStatusCode } from '@/src/constants/httpStatusCode'
export class BadRequestError extends CustomError {
    statusCode = HttpStatusCode.BAD_REQUEST

    constructor(public message: string) {
        super(message)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors() {
        return [
            {
                message: this.message,
            },
        ]
    }
}

export class NotAuthorizedError extends CustomError {
    statusCode = HttpStatusCode.UNAUTHORIZED
    constructor() {
        super('Not authorized')
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors() {
        return [
            {
                message: 'Not authorized',
            },
        ]
    }
}

export class NotFoundError extends CustomError {
    statusCode = HttpStatusCode.NOT_FOUND
    constructor() {
        super('Route not found')
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors() {
        return [
            {
                message: 'Not Found',
            },
        ]
    }
}
