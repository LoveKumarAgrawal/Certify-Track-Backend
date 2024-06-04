import * as mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema({
    roleId: String,
    name: String,
    email: String,
    dob: String,
    phoneNumber: Number,
    rollno: Number
},
{
    collection: 'register'
})