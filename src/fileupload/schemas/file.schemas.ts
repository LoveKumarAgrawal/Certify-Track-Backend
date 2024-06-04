import * as mongoose from 'mongoose';

export interface MyFormData extends mongoose.Document {
    id: string;
    name: string;
    type: string;
    startDate: Date;
    endDate: Date;
    file: File;
    userId: number;
    status: string;
    endorsed: string;
}

export const MyFormDataSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    file: { type: String, required: true },
    userId: { type: Number, required: true },
    status: { type: String, required: true },
    endorsed: { type: String }
});

export const MyFormDataModel = mongoose.model<MyFormData>('MyFormData', MyFormDataSchema);
