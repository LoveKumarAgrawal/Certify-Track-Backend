import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ITeacher } from './interface/teacher.interface';
import { Model } from 'mongoose';
import { TeacherDto } from './teacher.dto';

@Injectable()
export class TeacherService {
    constructor(@InjectModel('Teacher') private readonly teacherModel: Model<ITeacher>) { }

    public async addTeacher(newStudent: TeacherDto) {
        const teacher = new this.teacherModel(newStudent);
        const savedTeacher = await teacher.save();
        return savedTeacher;
    }
    public async allTeacher(): Promise<TeacherDto[]> {
        const teachers = await this.teacherModel.find({ roleId: { $eq: '66584b9eb71e72ada7eee731' } }).exec();
        return teachers;
    }
    public async deleteTeacher(id: string): Promise<void> {
        const teacher = await this.teacherModel.deleteOne({
            _id: id,
        }).exec();
        if (teacher.deletedCount === 0) {
            throw new HttpException("student not found", 404);
        }
    }
    public async getTeacherById(id: string): Promise<TeacherDto> {
        const teacher = await this.teacherModel.findOne({ _id: id, }).exec();
        if (!teacher) {
            throw new HttpException("Student Not Found", 404);
        }
        return teacher;
    }
    public async updateTeacherById(id: string, updateStudent: TeacherDto): Promise<TeacherDto> {
        const updatedTeacher = await this.teacherModel.findByIdAndUpdate(
            { _id: id },             
            {...updateStudent},
            {new: true}         
        ).exec();

        return updatedTeacher;
    }
}
