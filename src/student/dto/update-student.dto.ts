import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsDate, IsEmail } from 'class-validator';

export class UpdateStudentDto {
    @IsNumber()
    readonly id!: number;

    @IsString()
    readonly name?: string;

    @Type(() => Date)
    @IsDate()
    readonly dob?: Date;

    @IsEnum({
        MALE: 'Male',
        FEMALE: 'Female',
        OTHER: 'Other',
    })
    readonly gender?: string;

    @IsEmail()
    readonly email?: string;

    @IsNumber()
    readonly classId?: number;
}

