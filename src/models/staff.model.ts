import mongoose, { Schema } from "mongoose";
import schemaConstants from "@/src/constants/schemaConstants";

const staffSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        staff_id: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        is_available: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models[schemaConstants?.staffSchema] ||
    mongoose.model(schemaConstants?.staffSchema, staffSchema);
