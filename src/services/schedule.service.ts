import Schedule from "@/src/models/schedules.model"
import mongoose from "mongoose";

interface ICheckData {
    // name?: string;
    Date?:string;
    timeSlot:string;
    user_id:mongoose.Types.ObjectId
}

const checkExist = async (data: ICheckData) => {
    const res = await Schedule.exists(data)
    return res
}

const createItem = async (data: ICheckData) => {
    const res = await Schedule.create(data)
    return res
}


export default { checkExist,createItem }
