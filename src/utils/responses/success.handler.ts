import { Response } from 'express'

interface IMeta {
    page: number
    size: number
    totalPages: number
}
export const sendSuccessResponse = (
    res: Response,
    message?: string,
    data?: any,
    meta?: IMeta | Array<IMeta>,
) => {
    res.status(200).json({
        message,
        data,
        meta,
    })
}