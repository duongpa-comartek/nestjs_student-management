import { IsNumber, Max, Min } from 'class-validator';
import { Expose } from 'class-transformer';


export class CreateScoreDto {
    @IsNumber()
    @Min(0)
    @Max(10)
    readonly score: number;

    @Expose({ name: 'studentId' })
    @IsNumber()
    readonly student: number;

    @Expose({ name: 'subjectId' })
    @IsNumber()
    readonly subject: number;
}
