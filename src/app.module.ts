import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileuploadModule } from './fileupload/fileupload.module';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/College_Project'),
    StudentModule,
    FileuploadModule,
    AuthModule,
    TeacherModule],
})
export class AppModule {}
