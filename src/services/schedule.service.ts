import Schedule from "@/src/models/schedules.model"
import mongoose from "mongoose";
import { SampleRequestParams } from "../types/sample.types";

import { PipelineStage } from 'mongoose'
import Sample from "@/src/models/sample.model"

interface ICheckData {
    // name?: string;
    Date?: string;
    timeSlot: string;
    user_id: mongoose.Types.ObjectId
}

const checkExist = async (data: ICheckData) => {
    const res = await Schedule.exists(data)
    return res
}

const createItem = async (data: ICheckData) => {
    const res = await Schedule.create(data)
    return res
}

const insertMany = async (data: ICheckData[]) => {
    return await Schedule.insertMany(data);
};

const getItem = async (input: SampleRequestParams) => {
    const { search = '', page = 1, limit = 10, user_id, sort } = input;

    const searchRegex = new RegExp(search, 'i');

    const matchStage: PipelineStage.Match = {
        $match: {
            ...(search && {
                $or: [
                    { dosage: searchRegex },
                    { category: searchRegex },
                    { stock: searchRegex },
                    { lowStockThreshold: searchRegex },
                    { expiryDate: searchRegex },
                    { name: searchRegex },
                ],
            }),
            // ...({ createdBy: new mongoose.Types.ObjectId(user_id) }), // Filter for a specific user if user_id is provided
        },
    };

    const sortStage = { $sort: sort };

    console.log("sortttttttttttttttt", sort)

    const paginationStages: (PipelineStage.Skip | PipelineStage.Limit)[] = [
        {
            $skip: (page - 1) * limit,
        },
        {
            $limit: limit,
        },
    ];




    const pipeline: PipelineStage[] = [
        matchStage,
        ...(sort ? [{ $sort: sort }] : []),
        ...paginationStages,
    ];

    const TotalList = await Schedule.aggregate(pipeline);

    const countPipeline: PipelineStage[] = [
        matchStage,
        {
            $count: 'total',
        },
    ];
    const countResult = await Schedule.aggregate(countPipeline);
    const totalCount = countResult[0]?.total || 0;

    return {
        data: TotalList,
        count: totalCount,
    };
};


export default { checkExist, createItem, insertMany, getItem }
