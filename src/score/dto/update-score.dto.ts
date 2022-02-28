import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateScoreDto {
    @IsNumber()
    readonly id!: number;

    @IsNumber()
    @Min(0)
    @Max(10)
    @IsOptional()
    readonly score?: number;

    @IsNumber()
    @IsOptional()
    readonly studentId?: number;

    @IsNumber()
    @IsOptional()
    readonly subjectId?: number;
}
