import * as mongoose from "mongoose";

export const TeacherSchema = new mongoose.Schema({
    roleId: String,
    name: String,
    email: String,
    department: String,
    phoneNumber: Number,
    class: String
},
{
    collection: 'register'
})