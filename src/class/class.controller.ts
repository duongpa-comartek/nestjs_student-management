import { Body, Controller, Delete, Get, Patch, Post, Param } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto, UpdateClassDto, DeleteClassDto } from './dto/index'

@Controller('class')
export class ClassController {
    constructor(private service: ClassService) { }

    @Get()
    async getAll() {
        return this.service.getAll();
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
}
