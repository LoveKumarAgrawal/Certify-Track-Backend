import { Module } from '@nestjs/common';
import { FileuploadController } from './fileupload.controller';
import { FileuploadService } from './fileupload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MyFormDataSchema } from './schemas/file.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'File',
        schema: MyFormDataSchema
      },
    ]),
  ],
  controllers: [FileuploadController],
  providers: [FileuploadService]
})
export class FileuploadModule {}
