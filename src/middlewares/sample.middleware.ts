import { body } from "express-validator";
import { validateParams } from "@/src/utils/validateRequests"; // Assuming this utility exists

export const createValidator = () => {
    return validateParams([
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ min: 3, max: 100 })
            .withMessage('Name must be between 3 and 100 characters long'),

        body('dosage')
            .notEmpty()
            .withMessage('Dosage is required')
            .isLength({ min: 1, max: 50 })
            .withMessage('Dosage must be between 1 and 50 characters long'),

        // body('category')
        //     .notEmpty()
        //     .withMessage('Category is required')
        //     .isIn(MedicineCategory) // Validates that the category matches one of the MedicineCategory values
        //     .withMessage(`Category must be one of: ${MedicineCategory.join(", ")}`),

        body('stock')
            .notEmpty()
            .withMessage('Stock is required')
            .isInt({ min: 0 })
            .withMessage('Stock must be a non-negative integer'),

        body('lowStockThreshold')
            .notEmpty()
            .withMessage('Low Stock Threshold is required')
            .isInt({ min: 0 })
            .withMessage('Low Stock Threshold must be a non-negative integer'),

        body('expiryDate')
            .notEmpty()
            .withMessage('Expiry Date is required')
            .isISO8601()
            .withMessage('Expiry Date must be a valid date')
            .custom((value) => {
                if (new Date(value) <= new Date()) {
                    throw new Error('Expiry Date must be in the future');
                }
                return true;
            }),
    ]);
};

export const updateValidator = () => {
    return validateParams([
        body('name')
            .optional()
            .isLength({ min: 3, max: 100 })
            .withMessage('Name must be between 3 and 100 characters long'),

        body('dosage')
            .optional()
            .isLength({ min: 1, max: 50 })
            .withMessage('Dosage must be between 1 and 50 characters long'),

        body('stock')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Stock must be a non-negative integer'),

        body('lowStockThreshold')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Low Stock Threshold must be a non-negative integer'),

        body('expiryDate')
            .optional()
            .isISO8601()
            .withMessage('Expiry Date must be a valid date')
            .custom((value) => {
                if (value && new Date(value) <= new Date()) {
                    throw new Error('Expiry Date must be in the future');
                }
                return true;
            }),
    ]);
};
