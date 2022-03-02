import { IsEnum, IsNumberString, IsOptional, Max, Min } from "class-validator";

export type TypeOutcomes = "Good" | "Average" | "Bad";

export class GetStudentsFilterOutcome {
    @IsEnum({
        GOOD: 'Good',
        AVERAGE: 'Average',
        BAD: 'Bad',
    })
    readonly kindof: TypeOutcomes;

    @IsNumberString()
    @IsOptional()
    @Min(1)
    @Max(20)
    readonly limit?: number;

    @IsNumberString()
    @IsOptional()
    @Min(0)
    @Max(100)
    readonly offset?: number
}