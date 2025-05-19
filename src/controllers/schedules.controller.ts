import { NextFunction, Response, Request } from 'express';
// import sampleServices from '@/src/services/sample.service';
import scheduleServices from '@/src/services/schedule.service';
import { sendSuccessResponse } from '@/src/utils/responses/success.handler';
import { createErrorResponse } from '../utils/apiResponse';



export async function getSchedules(req: Request, res: Response, next: NextFunction) {
    try {
        const { search, user_id, sortBy, order }: any = req.query;

        const page = parseInt((req.query.page as string) || '1', 10);
        const limit = parseInt((req.query.limit as string) || '10', 10);

        const sortField = sortBy || 'createdAt'; // Default field
        const sortOrder = order === 'desc' ? -1 : 1; // Default to 'asc' = 1


        const { data, count } = await scheduleServices.getItem({ search, page, limit, user_id, sort: { [sortField]: sortOrder } });
        const totalPages = Math.ceil(count / limit);

        return sendSuccessResponse(res, 'Items fetched successfully', {
            data: data,
            meta: {
                page,
                limit,
                total: count,
                totalPages,
            },
        });

    } catch (error) {
        next(error);
    }

}