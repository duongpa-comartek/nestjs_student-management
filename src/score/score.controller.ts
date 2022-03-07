import { Controller, Get, Post, Body, Delete, Param, Patch, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto, UpdateScoreDto, DeleteScoreDto } from './dto/index';
import { StudentService } from 'src/student/student.service';
import { SubjectService } from 'src/subject/subject.service';
import { MailService } from 'src/mail/mail.service';
import * as XlsxTemplate from 'xlsx-template';
import * as fs from 'fs';
import { ClassService } from 'src/class/class.service';
import { Class } from 'src/class/class.entity';

@Controller('score')
export class ScoreController {
    constructor(
        private readonly scoreService: ScoreService,
        @Inject(forwardRef(() => StudentService))
        private readonly studentService: StudentService,
        @Inject(forwardRef(() => SubjectService))
        private readonly subjectService: SubjectService,
        @Inject(forwardRef(() => ClassService))
        private readonly classService: ClassService,
        private readonly mailService: MailService
    ) { }

    @Get()
    async getAll() {
        return this.scoreService.getAll();
    }

    @Post()
    async create(@Body() score: CreateScoreDto) {
        //Kiểm tra xem học sinh và môn học có tồn tại không
        const student = await this.studentService.findOneById(score.student);
        const subject = await this.subjectService.findOneById(score.subject);
        if (!subject && !student) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Student and Subject cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }

        if (!subject) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Subject cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }

        if (!student) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Student cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }

        // Nếu điểm đã tồn tại thì không thể thêm vào
        const hasScore = Boolean(await this.scoreService.hasScore(score));
        if (hasScore) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Score already exists!`,
            }, HttpStatus.BAD_REQUEST);
        }

        // Thêm vào score
        const result = this.scoreService.create(score);

        //Thông báo điểm nếu thành công
        if (result) {
            const data = await fs.promises.readFile('./src/templates/score.xlsx');
            const template = new XlsxTemplate(data);
            const values = {
                subject: subject.name,
                std: student,
                score: score.score,
                class: await this.studentService.inClass(student.id)
            };
            template.substitute(1, values);
            const dataFile = Buffer.from(template.generate('base64'), 'base64');

            this.mailService.sendMail({
                name: student.name,
                email: student.email,
                subject: subject.name,
                score: score.score,
                data: dataFile
            });
        }

        // Thông báo kết quả học tập nếu có điểm các môn
        if (await this.scoreService.hasScoreSubject(student.id) == await this.subjectService.hasSubject()) {
            const outcome = await this.scoreService.outcome(student.id);
            const avg = await this.scoreService.avgScore(student.id);
            let kindOf;
            if (avg < 5) kindOf = 'BAD';
            else if (avg >= 8) kindOf = 'GOOD';
            else kindOf = 'AVERAGE';
            const data = await fs.promises.readFile('./src/templates/outcome.xlsx');
            const template = new XlsxTemplate(data);
            const values = {
                std: student,
                info: outcome as { score_score: number, subject_name: string }[],
                avg: avg.toFixed(2),
                kindof: kindOf
            };
            template.substitute(1, values);
            const dataFile = Buffer.from(template.generate('base64'), 'base64');

            this.mailService.sendOutcomeMail({
                name: student.name,
                email: student.email,
                data: dataFile
            });
        }

        return result;
    }

    @Patch()
    async update(@Body() score: UpdateScoreDto) {

        return this.scoreService.update(score);
    }

    @Delete(':id')
    async delete(@Param() param: DeleteScoreDto) {
        const score = await this.scoreService.findOneById(+param.id);
        if (!score) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Score does not exist!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.scoreService.delete(param);
    }

    @Get('avg')
    async avg() {
        return await this.scoreService.avgScore(28);
    }
}
