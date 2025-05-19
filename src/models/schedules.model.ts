import mongoose, { Schema, Types } from "mongoose";
import schemaConstants from "@/src/constants/schemaConstants";

const schedulerSchema: Schema = new mongoose.Schema(
    {
        Date: {
            type: Date,
            required: true,
        },
        timeSlot: {
            type: String,
            enum: ["6 AM – 12 PM", "12 PM – 6 PM", "6 PM – 12 AM"],
            required: true,
        },
        assigned_by: {
            type: Types.ObjectId,
            ref: schemaConstants?.userSchema || "User", // Adjust according to your actual schema
            required: true,
        },
        user_id: {
            type: Types.ObjectId,
            ref: schemaConstants?.staffSchema || "Staff",
            required: true,
        },
        qr: {
            type: String, // You can store a base64 string, or a URL pointing to the QR image
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models[schemaConstants?.schedulerSchema] ||
    mongoose.model(schemaConstants?.schedulerSchema, schedulerSchema);
