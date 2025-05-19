import mongoose, { Schema } from "mongoose";
import schemaConstants from "@/src/constants/schemaConstants";
import { MedicineCategory } from "../types/sample.types";

const sampleSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        dosage: {
            type: String,
            required: true,
        },
        category: {
            type: String, 
            enum: MedicineCategory,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        lowStockThreshold: {
            type: Number,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models[schemaConstants?.sampleSchema] ||
    mongoose.model(schemaConstants?.sampleSchema, sampleSchema);
