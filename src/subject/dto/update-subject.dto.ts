import { IsEnum, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { TypeSubject } from '../subject.entity';

export class UpdateSubjectDto {
    @IsNumber()
    readonly id!: number;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    readonly name?: string;

    @IsEnum({
        ONLINE: 'Online',
        OFFLINE: 'Offline'
    })
    @IsOptional()
    readonly type?: TypeSubject
}
