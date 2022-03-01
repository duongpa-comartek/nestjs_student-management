import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateClassDto {
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    readonly name: string;

    @IsNumber()
    @Min(10)
    @Max(50)
    readonly totalMember: number;

    @IsString()
    @MinLength(10)
    @MaxLength(100)
    readonly teacherName: string;
}
