import { Controller, Get, Post, Body, Delete, Param, Patch, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, DeleteStudentDto, UpdateStudentDto, FindStudentByNameDto, FindGoodStudentOfClass } from './dto/index'

@Controller('student')
export class StudentController {
    constructor(private service: StudentService) { }

    @Get()
    async getAll() {
        return this.service.getAll();
    }

    @Post()
    async create(@Body() student: CreateStudentDto) {
        await this.service.create(student);
    }

    @Patch()
    async update(@Body() student: UpdateStudentDto) {
        console.log(student);
        return this.service.update(student);
    }

    @Delete(':id')
    async delete(@Param() param: DeleteStudentDto) {
        return this.service.delete(param);
    }

    @Get('goodStudentOfClass')
    async getGoodStudents(@Query() query: FindGoodStudentOfClass) {
        return this.service.getGoodStudents(query);
    }

    @Get('findName')
    async getByName(@Query() query: FindStudentByNameDto) {
        return this.service.getByName(query);
    }

}
