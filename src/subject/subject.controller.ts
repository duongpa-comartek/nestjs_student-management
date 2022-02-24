import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto, UpdateSubjectDto, DeleteSubjectDto } from './dto/index';

@Controller('subject')
export class SubjectController {
    constructor(private service: SubjectService) { }

    @Get()
    async getAll() {
        return this.service.getAll();
    }

    @Post()
    async create(@Body() subject: CreateSubjectDto) {
        console.log(subject);
        return this.service.create(subject);
    }

    @Patch()
    async update(@Body() subject: UpdateSubjectDto) {
        console.log(subject);
        return this.service.update(subject);
    }

    @Delete(':id')
    async delete(@Param() param: DeleteSubjectDto) {
        return this.service.delete(param);
    }
}
