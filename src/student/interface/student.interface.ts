import { Date, Document } from "mongoose";

export interface IStudent extends Document {
    readonly roleId: string;
    readonly name: string;
    readonly email: string;
    readonly dob: string;
    readonly phoneNumber: number;
    readonly rollno: number;
}