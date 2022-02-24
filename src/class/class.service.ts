import { Injectable } from '@nestjs/common';
import { CreateClassDto, DeleteClassDto, UpdateClassDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';

@Injectable()
export class ClassService {

    public async getAll() {
        return true;
    }

    public async create(createClassDto: CreateClassDto) {
        return true;
    }

    public async update({ id, ...updateClassDto }: UpdateClassDto) {
        return true;
    }

    public async delete(param: DeleteClassDto) {
        return true;
    }
}
