import { IsEnum, IsString, Length } from 'class-validator';
import { TypeSubject } from '../subject.entity';

export class CreateSubjectDto {
    @IsString()
    @Length(1, 50)
    readonly name: string;

    @IsEnum({
        ONLINE: 'Online',
        OFFLINE: 'Offline'
    })
    readonly type: TypeSubject;
}
