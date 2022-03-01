import { Expose, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsDate, IsEmail, IsOptional, Length } from 'class-validator';
import { TypeGender } from '../student.entity';

export class UpdateStudentDto {
    @IsNumber()
    readonly id!: number;

    @IsString()
    @Length(10, 100)
    @IsOptional()
    readonly name?: string;

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    readonly dob?: Date;

    @IsEnum({
        MALE: 'Male',
        FEMALE: 'Female',
        OTHER: 'Other',
    })
    @IsOptional()
    readonly gender?: TypeGender;

    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @Expose({ name: 'classId' })
    @IsNumber()
    @IsOptional()
    readonly class?: number;
}
