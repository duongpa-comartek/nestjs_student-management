import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateScoreDto {
    @IsNumber()
    readonly id!: number;

    @IsNumber()
    @Min(0)
    @Max(10)
    @IsOptional()
    readonly score?: number;

    @Expose({ name: 'studentId' })
    @IsNumber()
    @IsOptional()
    readonly student?: number;

    @Expose({ name: 'subjectId' })
    @IsNumber()
    @IsOptional()
    readonly subject?: number;
}
