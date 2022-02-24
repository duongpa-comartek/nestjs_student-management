
import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto, UpdateScoreDto, DeleteScoreDto } from './dto/index';

@Controller('score')
export class ScoreController {
    constructor(private service: ScoreService) { }

    @Get()
    async getAll() {
        return this.service.getAll();
    }

    @Post()
    async create(@Body() score: CreateScoreDto) {
        return this.service.create(score);
    }

    @Patch()
    async update(@Body() score: UpdateScoreDto) {
        return this.service.update(score);
    }

    @Delete(':id')
    async delete(@Param() param: DeleteScoreDto) {
        return this.service.delete(param);
    }
}
