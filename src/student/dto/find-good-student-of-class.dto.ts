import { IsNumberString, IsOptional, IsString, Length } from "class-validator";

export class FindGoodStudentOfClass {
    @IsString()
    @Length(1, 50)
    readonly name: string;


    @IsNumberString()
    @IsOptional()
    readonly limit?: number;

    @IsNumberString()
    @IsOptional()
    readonly offset?: number;
}

