import { TeacherService } from './teacher.service';
import { TeacherDto } from './teacher.dto';
import { Controller, Post, Body, Get, Delete, Param, Put, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';

@Controller('teacher')
export class TeacherController {
    constructor(private teacherService: TeacherService) { }

    @Get()
    public allTeacher() {
        return this.teacherService.allTeacher();
    }
    @Post()
    @UsePipes(ValidationPipe)
    public addTeacher(@Body() teacher: TeacherDto) {
        return this.teacherService.addTeacher(teacher);
    }
    @Delete(':id')
    public deleteTeacher(@Param('id') id: string) {
        return this.teacherService.deleteTeacher(id);
    }
    @Get(':id')
    public async getTeacherById(@Param('id') id:string){
        return this.teacherService.getTeacherById(id);
    }
    @Put(':id')
    public async updateTeacherById(@Param('id') id:string, @Body() teacher:TeacherDto) {
        return this.teacherService.updateTeacherById(id, teacher);
    }
}
