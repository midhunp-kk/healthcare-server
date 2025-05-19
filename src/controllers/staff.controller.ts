import { NextFunction, Response, Request } from 'express';
// import sampleServices from '@/src/services/sample.service';
import staffServices from '@/src/services/staff.service';
import scheduleServices from '@/src/services/schedule.service';
import { sendSuccessResponse } from '@/src/utils/responses/success.handler';
import { createErrorResponse } from '../utils/apiResponse';



export async function getData(req: Request, res: Response, next: NextFunction) {
    try {
        const { search, user_id, sortBy, order }: any = req.query;

        const page = parseInt((req.query.page as string) || '1', 10);
        const limit = parseInt((req.query.limit as string) || '10', 10);

        const sortField = sortBy || 'createdAt'; // Default field
        const sortOrder = order === 'desc' ? -1 : 1; // Default to 'asc' = 1


        const { data, count } = await staffServices.getItem({ search, page, limit, user_id, sort: { [sortField]: sortOrder } });
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


// export async function addSchedule(req: Request, res: Response, next: NextFunction) {
//     try {
//         const {
//             name,
//             dosage,
//             category,
//             stock,
//             lowStockThreshold,
//             expiryDate
//         } = req.body;


//         const isAlreadyExist = await staffServices.checkExist({
//             name
//         })

//         if (isAlreadyExist) {
//             return createErrorResponse(res, { message: 'Data Already exist' }, 400);
//         }


//         const Payload = {
//             name,
//             dosage,
//             category,
//             stock,
//             lowStockThreshold,
//             expiryDate
//         };
//         console.log(Payload, "Payload")
//         await staffServices.createItem(Payload);
//         return sendSuccessResponse(res, 'Created successfully');
//     } catch (error) {
//         next(error);
//     }
// };



import QRCode from 'qrcode';

export async function addSchedule(req: Request, res: Response, next: NextFunction) {
    try {
        const { Date, timeSlot, assigned_by, user_id } = req.body;

        // Check if already scheduled
        const isAlreadyExist = await scheduleServices.checkExist({
            Date,
            timeSlot,
            user_id
        });

        if (isAlreadyExist) {
            return createErrorResponse(res, { message: 'Schedule already exists' }, 400);
        }

        // Generate QR code (e.g., based on user_id + Date + timeSlot)
        const qrContent = `${user_id}_${Date}_${timeSlot}`;
        const qr = await QRCode.toDataURL(qrContent);

        const payload = {
            Date,
            timeSlot,
            assigned_by,
            user_id,
            qr,
        };

        await scheduleServices.createItem(payload);
        return sendSuccessResponse(res, 'Schedule created successfully');
    } catch (error) {
        next(error);
    }
}



