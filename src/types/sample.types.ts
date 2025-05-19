import mongoose from "mongoose";

export interface ISample {
    name: string,
    dosage: string,
    category: string,
    stock: number,
    lowStockThreshold: number,
    expiryDate: Date,
}

export interface IUpdateSample extends Partial<ISample> {
    _id?: mongoose.Types.ObjectId
}

export interface SampleRequestParams {
    user_id?: string;
    search?: string;
    page: number,
    limit: number,
    sort?: Record<string, 1 | -1>;
}
export enum MedicineCategory {
    PainKiller = 'pain killer',
    Antibiotic = 'antibiotic',
    Antiseptic = 'antiseptic',
    Antipyretic = 'antipyretic',
    Antiviral = 'antiviral',
    Antifungal = 'antifungal',
    Antidepressant = 'antidepressant',
    Antacid = 'antacid',
    Antihistamine = 'antihistamine',
    Steroid = 'steroid',
    Vitamin = 'vitamin',
    Vaccine = 'vaccine',
    Antidiabetic = 'antidiabetic',
    Antihypertensive = 'antihypertensive',
}