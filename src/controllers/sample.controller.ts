import { NextFunction, Response, Request } from 'express';
import sampleServices from '@/src/services/sample.service';
import { createErrorResponse } from '@/src/utils/apiResponse';
import { sendSuccessResponse } from '@/src/utils/responses/success.handler';


// export async function getData(req: Request, res: Response, next: NextFunction) {
//     try {
//         const { search, user_id }: any = req.query;
//         const page = parseInt((req.query.page as string) || '1', 10);
//         const limit = parseInt((req.query.limit as string) || '10', 10);
//         const { data, count } = await sampleServices.getItem({ search, page, limit, user_id });
//         const totalPages = Math.ceil(count / limit);

//         return sendSuccessResponse(res, 'Items fetched successfully', {
//             data: data,
//             meta: {
//                 page,
//                 limit,
//                 total: count,
//                 totalPages,
//             },
//         });

//     } catch (error) {
//         next(error);
//     }

// }

export async function getData(req: Request, res: Response, next: NextFunction) {
    try {
        const { search, user_id, sortBy, order }: any = req.query;

        const page = parseInt((req.query.page as string) || '1', 10);
        const limit = parseInt((req.query.limit as string) || '10', 10);

        const sortField = sortBy || 'createdAt'; // Default field
        const sortOrder = order === 'desc' ? -1 : 1; // Default to 'asc' = 1


        const { data, count } = await sampleServices.getItem({ search, page, limit, user_id, sort: { [sortField]: sortOrder } });
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

export async function createData(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            name,
            dosage,
            category,
            stock,
            lowStockThreshold,
            expiryDate
        } = req.body;


        const isAlreadyExist = await sampleServices.checkExist({
            name
        })

        if (isAlreadyExist) {
            return createErrorResponse(res, { message: 'Data Already exist' }, 400);
        }


        const Payload = {
            name,
            dosage,
            category,
            stock,
            lowStockThreshold,
            expiryDate
        };
        console.log(Payload, "Payload")
        await sampleServices.createItem(Payload);
        return sendSuccessResponse(res, 'Created successfully');
    } catch (error) {
        next(error);
    }
};

export async function updateItem(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            _id,
            name,
            dosage,
            category,
            stock,
            lowStockThreshold,
            expiryDate
        } = req.body;


        const isAlreadyExist = await sampleServices.checkExist({
            name
        })

        // if (isAlreadyExist) {
        //     return createErrorResponse(res, { message: 'Data Already exist' }, 400);
        // }


        const Payload = {
            name,
            dosage,
            category,
            stock,
            lowStockThreshold,
            expiryDate
        };
console.log(Payload,"Payload--------------------------",_id)
        const retVal = await sampleServices.updateItem(_id, Payload);

        return sendSuccessResponse(res, 'Updated successfully', { data: retVal });
    } catch (error) {
        next(error);
    }
};

export async function deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
        const doc_id = req.query._id as string;
        console.log(doc_id, "doc_id")
        if (!doc_id) {
            return createErrorResponse(res, { message: 'ID is required' }, 400);
        }

        await sampleServices.deleteItem(doc_id);

        return sendSuccessResponse(res, 'Data deleted successfully');
    } catch (error) {
        next(error);
    }
}
