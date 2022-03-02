
import { Controller, Get, Post, Body, Delete, Param, Patch, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto, UpdateScoreDto, DeleteScoreDto } from './dto/index';
import { StudentService } from 'src/student/student.service';
import { SubjectService } from 'src/subject/subject.service';

@Controller('score')
export class ScoreController {
    constructor(
        private readonly scoreService: ScoreService,

        @Inject(forwardRef(() => StudentService))
        private readonly studentService: StudentService,

        @Inject(forwardRef(() => SubjectService))
        private readonly subjectService: SubjectService
    ) { }

    @Get()
    async getAll() {
        return this.scoreService.getAll();
    }

    @Post()
    async create(@Body() score: CreateScoreDto) {
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

        return this.scoreService.create(score);
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
}
