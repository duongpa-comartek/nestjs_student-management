import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScoreDto, DeleteScoreDto, UpdateScoreDto } from './dto';
import { Score } from './score.entity';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(Score)
        private scoreRepository: Repository<Score>
    ) { }

    public async getAll(): Promise<Score[]> {
        return this.scoreRepository.find();
    }

    public async create(createScoreDto: CreateScoreDto): Promise<void> {
        await this.scoreRepository.save(createScoreDto);
    }

    public async update({ id, ...updateScoreDto }: UpdateScoreDto): Promise<void> {
        await this.scoreRepository.update({ id }, updateScoreDto);
    }

    public async delete(param: DeleteScoreDto): Promise<void> {
        await this.scoreRepository.delete(+param.id);
    }
}
