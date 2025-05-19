import mongoose, { PipelineStage } from 'mongoose'
import Staff from "@/src/models/staff.model"

export interface SampleRequestParams {
    user_id?: string;
    search?: string;
    page: number,
    limit: number,
    sort?: Record<string, 1 | -1>;
}

const createItem = async (data: any) => {
    const res = await Staff.create(data)
    return res
}

interface ICheckData {
    name?: string;
}
const checkExist = async (data: ICheckData) => {
    const res = await Staff.exists(data)
    return res
}

const updateItem = async (id: string, data: any) => {
    const res = await Staff.updateOne(
        {
            _id: id,
        },
        data
    )
    return res
}


const getItem = async (input: SampleRequestParams) => {
    const { search = '', page = 1, limit = 10, user_id, sort } = input;

    const searchRegex = new RegExp(search, 'i');
    const matchStage: PipelineStage.Match = {
        $match: {
            ...(search && {
                $or: [
                    { name: searchRegex },
                    { department: searchRegex },
                    { staff_id: searchRegex },
                    { role: searchRegex },
                ],
            }),
            is_available: true, // Only fetch available staff
        },
    };


    const sortStage = { $sort: sort };

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

    const TotalList = await Staff.aggregate(pipeline);

    const countPipeline: PipelineStage[] = [
        matchStage,
        {
            $count: 'total',
        },
    ];
    const countResult = await Staff.aggregate(countPipeline);
    const totalCount = countResult[0]?.total || 0;

    return {
        data: TotalList,
        count: totalCount,
    };
};

const deleteItem = async (_id: string) => {
    const res = await Staff.findByIdAndDelete(_id)
    return res
}

export default { createItem, checkExist, updateItem, getItem, deleteItem }