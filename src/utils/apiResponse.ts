
const statusMessages: { [key: number]: string } = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
};

export function createResponse(
    res: any,
    {
        data,
        status = 200,
        meta = {},
        page = 1,
        size = null,
    }: {
        data: unknown;
        status?: number;
        meta?: unknown;
        page?: number;
        size?: null | number;
    }
) {
    res.status(status).json({
        status,
        message: statusMessages[status] || 'Success',
        data,
        meta,
        page,
        size,
    });
}

export function createErrorResponse(res: any, err: unknown, meta?: unknown) {
    const error = JSON.parse(JSON.stringify(err)) || {};
    const status = error?.status || 500;
    const errorMessage =
        error.message || statusMessages[status] || 'An error occurred';
    res.status(status).json({
        status,
        message: errorMessage,
        error: error?.message || error || 'Unknown error',
        meta,
        timestamp: new Date().toISOString(),
    });
}