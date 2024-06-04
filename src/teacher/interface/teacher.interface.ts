import { Document } from "mongoose";

export interface ITeacher extends Document {
    readonly roleId: string;
    readonly name: string;
    readonly email: string;
    readonly department: string;
    readonly phoneNumber: number;
    readonly class: string;
}