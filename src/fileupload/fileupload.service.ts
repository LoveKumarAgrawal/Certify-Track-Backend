import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileUploadDto } from './fileupload.dto';

@Injectable()
export class FileuploadService {
    constructor(@InjectModel('File') private readonly fileModel: Model<any>) {}

    public async uploadData(formDataArray: any[]) {
        const savedData = await this.fileModel.insertMany(formDataArray);
        return savedData;
    }
    public async getData(): Promise<any[]> {
        const fileData = await this.fileModel.find().exec();
        if (!fileData) {
            throw new HttpException('sadasdNot found', 404);
        }
        return fileData;
    }
    public async deleteData(id: string) {
        const file = await this.fileModel.deleteOne({
            id: id,
        }).exec();
        if (file.deletedCount === 0) {
            throw new HttpException("student not found", 404);
        }
    }

    public async updateStatus(id: string, newStatus: string, endorsed: string): Promise<any> {
        const updateStatus = await this.fileModel.findByIdAndUpdate(
          { _id: id },
          { status: newStatus, endorsed: endorsed },
          { new: true }
        );
    
        if (!updateStatus) {
          throw new HttpException(`Not found`, 404);
        }
    
        return updateStatus;
      }
}