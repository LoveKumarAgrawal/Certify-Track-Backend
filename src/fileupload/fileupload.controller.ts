import { Controller, Post, UseInterceptors, UploadedFiles, Body, Get, Delete, Param, Query, UploadedFile, Res, StreamableFile, NotFoundException, Put } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileuploadService } from './fileupload.service';
import * as fs from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('fileupload')
export class FileuploadController {

    constructor(private fileUploadService: FileuploadService) {}

    @Get('get')
    public async getFilesAndFormData(){
        return this.fileUploadService.getData();
    }

    @Post('addOne')
    @UseInterceptors(FileInterceptor('file', {
        storage:  diskStorage({
            destination: process.env.UPLOAD_DIRECTORY || './upload',
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}-${Date.now()}`);
            }
        }),
        limits: {
            fileSize: Number(process.env.MAX_FILE_SIZE) || 10485760 // 10MB default
        }
    }))
    public async uploadFileandData(
        @UploadedFile() file: Express.Multer.File,
        @Body() otherData: any
    ) {
        const req = {
            ...otherData,
            file: file.filename
        };
        return await this.fileUploadService.uploadData([req]);
    }

    @Post('add')
    @UseInterceptors(FilesInterceptor('files', 100, {
        storage: diskStorage({
            destination: process.env.UPLOAD_DIRECTORY || './upload',
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}-${Date.now()}`);
            }
        }),
        limits: {
            fileSize: Number(process.env.MAX_FILE_SIZE) || 10485760 // 10MB default
        }
    }))
    public async uploadFilesAndFormData(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() otherData: any
    ) {
        const combinedData = files.map((file, index) => ({
            file: file.filename,
            name: otherData.names[index],
            type: otherData.types[index],
            startDate: otherData.startDates[index],
            endDate: otherData.endDates[index],
            id: otherData.ids[index],
            userId: otherData.userId[index],
            status: otherData.status[index],
            endorsed: otherData.endorsed[index]
        }));
        return await this.fileUploadService.uploadData(combinedData);
    }

    @Delete(':id')
    public async deleteFile(@Param('id') id: string, @Query() query: any){
        try {
            await fs.promises.unlink(`${(process.env.UPLOAD_DIRECTORY) || './upload'}/${query.filename}`);
        } catch (err) {
            console.error(err);
            throw err;
        }

        return this.fileUploadService.deleteData(id);
    }

    @Get('openPdf/:filename')
    async openPdf(
        @Param('filename') filename: string,
        @Res() res: Response
    ): Promise<void> {
        try {
            const filePath = join(process.cwd(), `${(process.env.UPLOAD_DIRECTORY) || './upload'}/${filename}`);
            if (!fs.existsSync(filePath)) {
                throw new NotFoundException('File not found');
            }
            const fileStream = fs.createReadStream(filePath);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${filename}.pdf`
            });
            fileStream.pipe(res);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while opening the PDF file');
        }
    }

    @Put(':id')
    async updateStatus(@Param('id') id: string, @Query() query: any) {
        return this.fileUploadService.updateStatus(id, query.status, query.endorsed)
    }
}
