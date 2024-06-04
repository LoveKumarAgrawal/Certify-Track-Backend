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

export class StudentDto {
    readonly roleId: string;
    @IsString()
    @Length(2, 30)
    readonly name: string;
    @IsEmail({}, { message: 'Please enter a valid email address' })
    readonly email: string;
    @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/, {
        message: 'DOB must be in the format DD-MM-YYYY',
    })
    readonly dob: string;
    @IsInt({ message: 'Phone number must be a number' })
    @Min(6000000000, {
        message: 'Phone number must be at least 10 digits and start with 6, 7, 8, or 9',
    })
    @Max(9999999999, {
        message: 'Phone number must be at most 10 digits and start with 6, 7, 8, or 9',
    })

    @IsNotEmpty()
    readonly phoneNumber: number;
    
    @IsInt({ message: 'Roll number must be a number' })
    @Min(1000000000, { message: 'Roll number must be exactly 10 digits' })
    @Max(9999999999, { message: 'Roll number must be exactly 10 digits' })
    readonly rollno: number;
}