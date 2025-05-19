import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@/src/utils/errors/custom.errors';

export const errorHandler = (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('Error caught in global handler::', err);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    return res.status(500).send({
        errors: [{ message: 'Something went wrong' }],
    });
};