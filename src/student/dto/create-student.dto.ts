import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsDate, IsEmail, Length } from 'class-validator';
import { TypeGender } from '../student.entity';

export class CreateStudentDto {
    @IsString()
    @Length(10, 100)
    readonly name: string;

    @Type(() => Date)
    @IsDate()
    readonly dob: Date;

    @IsEnum({
        MALE: 'Male',
        FEMALE: 'Female',
        OTHER: 'Other',
    })
    readonly gender: TypeGender;

    @IsEmail()
    readonly email: string;

    @IsNumber()
    readonly classId: number;
}
