import { IsString, Length } from "class-validator";


export class FindGoodStudentOfClass {
    @IsString()
    @Length(1, 50)
    readonly name: string;
}