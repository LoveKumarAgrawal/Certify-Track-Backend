import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IStudent } from './interface/student.interface';
import { Model } from 'mongoose';
import { StudentDto } from './student.dto';

@Injectable()
export class StudentService {

    constructor(@InjectModel('Student') private readonly studentModel: Model<IStudent>) { }

    public async addStudent(newStudent: StudentDto) {
        const student = new this.studentModel(newStudent);
        const savedStudent = await student.save();
        return savedStudent;
    }
    public async allStudent(): Promise<StudentDto[]> {
        const students = await this.studentModel.find({ roleId: { $eq: '66584b7db71e72ada7eee730' } }).exec();
        return students;
    }
    public async deleteStudent(id: string): Promise<void> {
        const student = await this.studentModel.deleteOne({
            _id: id,
        }).exec();
        if (student.deletedCount === 0) {
            throw new HttpException("student not found", 404);
        }
    }
    public async getStudentById(id: string): Promise<StudentDto> {
        const student = await this.studentModel.findOne({ _id: id, }).exec();
        if (!student) {
            throw new HttpException("Student Not Found", 404);
        }
        return student;
    }
    public async updateStudentById(id: string, updateStudent: StudentDto): Promise<StudentDto> {
        const updatedStudent = await this.studentModel.findByIdAndUpdate(
            { _id: id },             
            {...updateStudent},
            {new: true}         
        ).exec();
        return updatedStudent;
    }
    public async findOneForLogin(username: string):Promise<StudentDto | any> {
        return await this.studentModel.findOne({ "name": { $eq: `${username}` } });
    }
}
