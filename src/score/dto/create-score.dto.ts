import { IsNumber, Max, Min } from 'class-validator';

export class CreateScoreDto {
    @IsNumber()
    readonly id: number;

    @IsNumber()
    @Min(0)
    @Max(10)
    readonly score: number;

    @IsNumber()
    readonly studentId: number;

    @IsNumber()
    readonly subjectId: number;
}