import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto, SendOutcomeMailDto } from './dto/index';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    public async sendMail(sendMailDto: SendMailDto) {
        const date = new Date();
        await this.mailerService.sendMail({
            to: sendMailDto.email,
            subject: 'Bạn có kết quả học tập mới!', // Subject line
            template: 'score',
            attachments: [
                {
                    filename: 'result.xlsx',
                    contentType:
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    content: sendMailDto.data,
                },
            ],
            context: {
                name: sendMailDto.name,
                score: sendMailDto.score,
                subject: sendMailDto.subject,
                date: date
            }
        });
    }

    public async sendOutcomeMail(sendOutcomeMail: SendOutcomeMailDto) {
        const date = new Date();
        await this.mailerService.sendMail({
            to: sendOutcomeMail.email,
            subject: 'Bạn có kết quả học tập tất cả các môn học!',
            template: 'outcome',
            attachments: [
                {
                    filename: 'result.xlsx',
                    contentType:
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    content: sendOutcomeMail.data,
                },
            ],
            context: {
                name: sendOutcomeMail.name,
                date: date
            }
        });
    }
}
