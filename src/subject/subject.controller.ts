import { Body, Controller, Delete, forwardRef, Get, HttpException, HttpStatus, Inject, Param, Patch, Post } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto, UpdateSubjectDto, DeleteSubjectDto } from './dto/index';
import { ScoreService } from 'src/score/score.service';

@Controller('subject')
export class SubjectController {
    constructor(
        private readonly subjectService: SubjectService,

        @Inject(forwardRef(() => ScoreService))
        private readonly scoreService: ScoreService
    ) { }

    @Get()
    async getAll() {
        return this.subjectService.getAll();
    }

    @Post()
    async create(@Body() subject: CreateSubjectDto) {
        console.log(subject);
        return this.subjectService.create(subject);
    }

    @Patch()
    async update(@Body() subject: UpdateSubjectDto) {
        console.log(subject);
        return this.subjectService.update(subject);
    }

    @Delete(':id')
    async delete(@Param() param: DeleteSubjectDto) {
        const hasScore = await this.scoreService.findScoreSubjectById(+param.id);
        if (hasScore) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Subject has scores!`,
            }, HttpStatus.BAD_REQUEST);
        }
        const score = await this.scoreService.findOneById(+param.id);
        if (!score) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Score does not exist!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.subjectService.delete(param);
    }
}
