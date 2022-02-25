import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, DeleteStudentDto, UpdateStudentDto } from './dto/index'
import { Student } from './student.entity';

@Controller('student')
export class StudentController {
    constructor(private service: StudentService) { }

    @Get()
    async getAll() {
        return this.service.getAll();
    }

    @Post()
    async create(@Body() student: CreateStudentDto) {
        console.log(student);
        return this.service.create(student);
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

}
