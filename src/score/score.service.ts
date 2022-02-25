import { Injectable } from '@nestjs/common';
import { CreateScoreDto, DeleteScoreDto, UpdateScoreDto } from './dto';

@Injectable()
export class ScoreService {
    public async getAll() {
        return true;
    }

    public async create(createScoreDto: CreateScoreDto) {
        return true;
    }

    public async update({ id, ...updateScoreDto }: UpdateScoreDto) {
        return true;
    }

    public async delete(param: DeleteScoreDto) {
        return true;
    }
}
