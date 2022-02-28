import { Injectable } from '@nestjs/common';
import { CreateClassDto, DeleteClassDto, UpdateClassDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private classRepository: Repository<Class>
    ) { }

    public async getAll(): Promise<Class[]> {
        return this.classRepository.find();
    }

    public async create(createClassDto: CreateClassDto): Promise<void> {
        await this.classRepository.save(createClassDto);
    }

    public async update({ id, ...updateClassDto }: UpdateClassDto): Promise<void> {
        await this.classRepository.update({ id }, updateClassDto);
    }
    public async delete(param: DeleteClassDto): Promise<void> {
        await this.classRepository.delete(+param.id);
    }
}
