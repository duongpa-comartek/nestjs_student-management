import { IsString, IsEmail, Length } from 'class-validator';
export class SendMailDto {
    @IsString()
    @Length(10, 100)
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @Length(1, 500)
    readonly info: string;

    // @IsBase64()
    // readonly datafile: ('base64');

}
