import mongoose, { Schema } from "mongoose";
import schemaConstants from "@/src/constants/schemaConstants";

const userSchema: Schema = new mongoose.Schema(
    {
        role: {
            type: String,
            ref: 'Role',
            enum: ["Admin", "User"],
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        age: {
            type: String,
        },
        gender: {
            type: String,
        },
        designation: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models[schemaConstants?.userSchema] ||
    mongoose.model(schemaConstants?.userSchema, userSchema);
