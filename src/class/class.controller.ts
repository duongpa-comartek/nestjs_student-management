import { Body, Controller, Delete, Get, Patch, Post, Param, Query, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { ClassService } from './class.service';
import { CreateClassDto, UpdateClassDto, DeleteClassDto, FindStudentInfoByNameDto } from './dto/index'

@Controller('class')
export class ClassController {
    constructor(
        private readonly classService: ClassService,

        @Inject(forwardRef(() => StudentService))
        private readonly studentService: StudentService
    ) { }

    @Get()
    async getAll() {
        return this.classService.getAll();
    }

    @Get('students')
    async getStudents() {
        return this.classService.getListStudents();
    }

    @Post()
    async create(@Body() createClassDto: CreateClassDto) {
        return this.classService.create(createClassDto);
    }

    @Patch()
    async update(@Body() createClassDto: UpdateClassDto) {
        return this.classService.update(createClassDto);
    }

    @Delete(':id')
    async delete(@Param() param: DeleteClassDto) {
        const student = await this.studentService.findStudentClassById(+param.id);
        if (student) {
            throw new HttpException(`Bad Request: Class has students!`, HttpStatus.BAD_REQUEST);
        }
        const _class = await this.classService.findOneById(+param.id);
        if (!_class) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Class does not exist!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.classService.delete(param);
    }

    @Get('findStudent')
    async getStudentByName(@Query() query: FindStudentInfoByNameDto) {
        return this.classService.getStudentByName(query);
    }
}
