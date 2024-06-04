export class FileUploadDto {
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly file: string;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly userId: number;
    readonly status: string;
    readonly endorsed: string;
}