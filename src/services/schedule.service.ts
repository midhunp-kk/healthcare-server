import Schedule from "@/src/models/schedules.model"
import mongoose from "mongoose";

export interface SampleRequestParams {
    user_id?: string;
    search?: string;
    page: number,
    limit: number,
    sort?: Record<string, 1 | -1>;
}

interface ICheckData {
    Date: string;
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

    // Search keys updated according to your headers: e.g. name, staff_id, department, role
    const matchStage: any = {
        $match: {
            ...(search && {
                $or: [
                    { Date: searchRegex },
                    { timeSlot: searchRegex },
                    { assigned_by: searchRegex },
                    { role: searchRegex },
                    { timeSlot: searchRegex },
                    { Date: searchRegex },
                ],
            }),
            // Uncomment if you want to filter by user_id
            // ...(user_id && { user_id: new mongoose.Types.ObjectId(user_id) }),
        },
    };

    // Lookup for assigned_by -> staff collection to get assigned_by_info
    const lookupAssignedByStage = {
        $lookup: {
            from: "staffs",  // make sure your collection name is 'staffs'
            localField: "assigned_by",
            foreignField: "_id",
            as: "assigned_by_info",
        },
    };

    // Unwind assigned_by_info (staff info)
    const unwindAssignedByStage = {
        $unwind: {
            path: "$assigned_by_info",
            preserveNullAndEmptyArrays: true,
        },
    };

    // Lookup for user_id -> staff collection to get user_info
    const lookupUserStage = {
        $lookup: {
            from: "staffs",
            localField: "user_id",
            foreignField: "_id",
            as: "user_info",
        },
    };

    // Unwind user_info (staff info)
    const unwindUserStage = {
        $unwind: {
            path: "$user_info",
            preserveNullAndEmptyArrays: true,
        },
    };

    const paginationStages = [
        { $skip: (page - 1) * limit },
        { $limit: limit },
    ];

    const pipeline: any[] = [
        matchStage,
        lookupAssignedByStage,
        unwindAssignedByStage,
        lookupUserStage,
        unwindUserStage,
        ...(sort ? [{ $sort: sort }] : []),
        ...paginationStages,
    ];

    // Project to include fields and rename assigned_by and user_id to their names
    pipeline.push({
        $project: {
            _id: 1,
            Date: 1,
            timeSlot: 1,
            qr: 1,
            assigned_by: "$assigned_by_info.name",  // or whatever field is the staff name
            user_id: "$user_info.name",
            // Include other fields as needed
        },
    });

    const TotalList = await Schedule.aggregate(pipeline);

    const countPipeline = [
        matchStage,
        {
            $count: "total",
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
