import { IsString, Length } from 'class-validator';

export class FindStudentByNameDto {
    @IsString()
    @Length(10, 100)
    readonly name: string;
}
