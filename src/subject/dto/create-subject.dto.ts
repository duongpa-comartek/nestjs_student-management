import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateSubjectDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    readonly name: string;

    @IsEnum({
        ONLINE: 'Online',
        OFFLINE: 'Offline'
    })
    readonly type: string
}