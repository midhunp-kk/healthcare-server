import { body } from "express-validator";
import { validateParams } from "@/src/utils/validateRequests";



export const createValidator = () => {
    return validateParams([
        body('Date')
            .notEmpty()
            .withMessage('Date is required')
            .isISO8601()
            .withMessage('Date must be a valid ISO 8601 date'),

        body('timeSlot')
            .notEmpty()
            .withMessage('Time slot is required')
            .isIn(["6 AM – 12 PM", "12 PM – 6 PM", "6 PM – 12 AM"])
            .withMessage('Time slot must be one of: morning, evening, night'),

        body('assigned_by')
            .notEmpty()
            .withMessage('Assigned by is required')
            .isMongoId()
            .withMessage('Assigned by must be a valid Mongo ID'),

        body('user_id')
            .notEmpty()
            .withMessage('User ID is required')
            .isMongoId()
            .withMessage('User ID must be a valid Mongo ID'),
    ]);
};
