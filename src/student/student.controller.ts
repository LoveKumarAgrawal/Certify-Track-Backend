import { Controller, Post, Body, Get, Delete, Param, Put, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) { }

    @Get()
    public allStudent() {
        return this.studentService.allStudent();
    }
    @Post()
    @UsePipes(ValidationPipe)
    public addStudent(@Body() student: StudentDto) {
        return this.studentService.addStudent(student);
    }
    @Delete(':id')
    public deleteStudent(@Param('id') id: string) {
        return this.studentService.deleteStudent(id);
    }
    @Get(':id')
    public async getStudentById(@Param('id') id:string){
        return this.studentService.getStudentById(id);
    }
    @Put(':id')
    public async updateStudentById(@Param('id') id:string, @Body() student:StudentDto) {
        return this.studentService.updateStudentById(id, student);
    }
}

