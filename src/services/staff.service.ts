import { ISample, IUpdateSample, SampleRequestParams } from '@/src/types/sample.types'
import { PipelineStage } from 'mongoose'
// import Sample from "@/src/models/sample.model"
import Staff from "@/src/models/staff.model"

const createItem = async (data: ISample) => {
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

const updateItem = async (id: string, data: IUpdateSample) => {
    const res = await Staff.updateOne(
        {
            _id: id,
        },
        data
    )
    return res
}

// const getItem = async (input: SampleRequestParams) => {
//     const { search = '', page = 1, limit = 10, user_id } = input;

//     const searchRegex = new RegExp(search, 'i');

//     const matchStage: PipelineStage.Match = {
//         $match: {
//             ...(search && {
//                 $or: [
//                     { dosage: searchRegex },
//                     { category: searchRegex },
//                     { stock: searchRegex },
//                     { lowStockThreshold: searchRegex },
//                     { expiryDate: searchRegex },
//                     { name: searchRegex },
//                 ],
//             }),
//             // ...({ createdBy: new mongoose.Types.ObjectId(user_id) }), // Filter for a specific user if user_id is provided
//         },
//     };

//     const sortStage: PipelineStage[] = []; // You can add sorting logic here if needed

//     const paginationStages: (PipelineStage.Skip | PipelineStage.Limit)[] = [
//         {
//             $skip: (page - 1) * limit,
//         },
//         {
//             $limit: limit,
//         },
//     ];

//     const pipeline: PipelineStage[] = [
//         matchStage,
//         ...sortStage,
//         ...paginationStages,
//     ];

//     const TotalList = await Sample.aggregate(pipeline);

//     const countPipeline: PipelineStage[] = [
//         matchStage,
//         {
//             $count: 'total',
//         },
//     ];
//     const countResult = await Sample.aggregate(countPipeline);
//     const totalCount = countResult[0]?.total || 0;

//     return {
//         data: TotalList,
//         count: totalCount,
//     };
// };

const getItem = async (input: SampleRequestParams) => {
    const { search = '', page = 1, limit = 10, user_id, sort } = input;

    const searchRegex = new RegExp(search, 'i');

    // const matchStage: PipelineStage.Match = {
    //     $match: {
    //         ...(search && {
    //             $or: [
    //                 { dosage: searchRegex },
    //                 { category: searchRegex },
    //                 { stock: searchRegex },
    //                 { lowStockThreshold: searchRegex },
    //                 { expiryDate: searchRegex },
    //                 { name: searchRegex },
    //             ],
    //         }),
    //         // ...({ createdBy: new mongoose.Types.ObjectId(user_id) }), // Filter for a specific user if user_id is provided
    //     },
    // };


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


// const getSamples = async (input: SampleRequestParams) => {  LOOL_UP
//     const { search = '', page = 1, limit = 10, user_id } = input;

//     const searchRegex = new RegExp(search, 'i');

//     const matchStage: PipelineStage.Match = {
//         $match: {
//             $or: [
//                 { collectionDate: searchRegex },
//                 { status: searchRegex },
//                 { test: searchRegex },
//                 { collectionDate: searchRegex },
//                 { 'testDetails.emailId': searchRegex },
//                 { 'testDetails.testName': searchRegex },
//                 { 'testDetails.referredBy': searchRegex },
//                 { 'testDetails.status': searchRegex },
//                 { 'testDetails.receiptID': searchRegex },
//             ],
//         },
//     };

//     const lookupStage: PipelineStage.Lookup = {
//         $lookup: {
//             from: 'testrequests',
//             localField: 'testRequestId',
//             foreignField: '_id',
//             as: 'testDetails',
//         }
//     }
//     const unwindStage: PipelineStage.Unwind = {
//         $unwind: {
//             path: '$testDetails',
//             preserveNullAndEmptyArrays: true,
//         },
//     };
//     const sortStage: PipelineStage[] = []; // You can add sorting logic here if needed

//     const paginationStages: (PipelineStage.Skip | PipelineStage.Limit)[] = [
//         {
//             $skip: (page - 1) * limit,
//         },
//         {
//             $limit: limit,
//         },
//     ];

//     const pipeline: PipelineStage[] = [
//         matchStage,
//         lookupStage,
//         unwindStage,
//         ...sortStage,
//         ...paginationStages,
//     ];

//     const TotalList = await Sample.aggregate(pipeline);

//     const countPipeline: PipelineStage[] = [
//         matchStage,
//         {
//             $count: 'total',
//         },
//     ];
//     const countResult = await Sample.aggregate(countPipeline);
//     const totalCount = countResult[0]?.total || 0;

//     return {
//         data: TotalList,
//         count: totalCount,
//     };
// };