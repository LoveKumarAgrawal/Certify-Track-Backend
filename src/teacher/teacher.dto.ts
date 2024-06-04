import {
    IsString,
    IsEmail,
    IsInt,
    Min,
    Max,
    Matches,
    Length,
    IsNotEmpty
} from 'class-validator';

export class TeacherDto {
    readonly roleId: string;
    @IsString()
    @Length(2, 30)
    readonly name: string;
    @IsEmail({}, { message: 'Please enter a valid email address' })
    readonly email: string;
    @IsString()
    readonly department: string;
    @IsInt({ message: 'Phone number must be a number' })
    @Min(6000000000, {
        message: 'Phone number must be at least 10 digits and start with 6, 7, 8, or 9',
    })
    @Max(9999999999, {
        message: 'Phone number must be at most 10 digits and start with 6, 7, 8, or 9',
    })
    @IsNotEmpty()
    readonly phoneNumber: number;
    
    
    readonly class: string;
}