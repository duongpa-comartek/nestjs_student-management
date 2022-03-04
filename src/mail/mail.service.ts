import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { info } from 'console';
import { SendMailDto } from './dto/send-mail.dto'

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    public async sendMail(sendMailDto: SendMailDto) {
        const date = new Date();
        console.log(sendMailDto.email);
        await this.mailerService.sendMail({
            to: sendMailDto.email,
            subject: 'You have a new study result!', // Subject line
            template: 'score',
            context: {
                name: sendMailDto.name,
                info: sendMailDto.info,
                date: date
            }
        });
    }
}
