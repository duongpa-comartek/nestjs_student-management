import { Controller, Get, Post, Body, Delete, Param, Patch, Query, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, DeleteStudentDto, UpdateStudentDto, FindStudentByNameDto, FindGoodStudentOfClass, GetStudentsFilterOutcome } from './dto/index'
import { ClassService } from 'src/class/class.service';
import { ScoreService } from 'src/score/score.service';

@Controller('student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService,

        @Inject(forwardRef(() => ClassService))
        private readonly classService: ClassService,

        @Inject(forwardRef(() => ScoreService))
        private readonly scoreService: ScoreService
    ) { }

    @Get()
    async getAll() {
        return this.studentService.getAll();
    }

    @Post()
    async create(@Body() student: CreateStudentDto) {
        const _class = await this.classService.findOneById(student.class);
        if (!_class) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Class cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        await this.studentService.create(student);
    }

    @Patch()
    async update(@Body() student: UpdateStudentDto) {
        console.log(student);
        return this.studentService.update(student);
    }

    @Delete(':id')
    async delete(@Param() param: DeleteStudentDto) {
        const score = await this.scoreService.findScoreStudentById(+param.id);
        if (score) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Student has scores!`,
            }, HttpStatus.BAD_REQUEST);
        }
        const student = await this.studentService.findOneById(+param.id);
        if (!student) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Student does not exist!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.studentService.delete(param);
    }

    @Get('goodStudentOfClass')
    async getGoodStudents(@Query() query: FindGoodStudentOfClass) {
        return this.studentService.getGoodStudents(query);
    }

    @Get('findName')
    async getByName(@Query() query: FindStudentByNameDto) {
        return this.studentService.getByName(query);
    }

    @Get('outcome')
    async getListOutcomes(@Query() query: GetStudentsFilterOutcome) {
        return this.studentService.getListOutcomes(query);
    }


}
