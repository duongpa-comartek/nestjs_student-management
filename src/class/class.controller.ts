import { Body, Controller, Delete, Get, Patch, Post, Param, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto, UpdateClassDto, DeleteClassDto, FindStudentInfoByNameDto } from './dto/index'

@Controller('class')
export class ClassController {
    constructor(private service: ClassService) { }

    @Get()
    async getAll() {
        return this.service.getAll();
    }

    @Get('students')
    async getStudents() {
        return this.service.getStudents();
    }

    @Post()
    async create(@Body() createClassDto: CreateClassDto) {
        return this.service.create(createClassDto);
    }

    @Patch()
    async update(@Body() createClassDto: UpdateClassDto) {
        return this.service.update(createClassDto);
    }

    @Delete(':id')
    async delete(@Param() param: DeleteClassDto) {
        return this.service.delete(param);
    }

    @Get('findStudent')
    async getStudentByName(@Query() query: FindStudentInfoByNameDto) {
        return this.service.getStudentByName(query);
    }
}
